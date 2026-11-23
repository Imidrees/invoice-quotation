import { prisma } from '@/lib/prisma';
import { hashPassword, verifyPassword, generateToken, setSessionCookie } from '@/lib/auth';
import { LoginSchema } from '@/lib/validation';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = LoginSchema.parse(body);

    // Find user
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return Response.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      );
    }

    // Verify password
    const passwordValid = await verifyPassword(password, user.password);
    if (!passwordValid) {
      return Response.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      );
    }

    // Generate token
    const token = generateToken(user.id);

    // Create session
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + parseInt(process.env.SESSION_EXPIRY_HOURS || '24'));

    await prisma.session.create({
      data: {
        userId: user.id,
        token,
        expiresAt,
      },
    });

    // Set cookie
    await setSessionCookie(token);

    return Response.json(
      { success: true, userId: user.id },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return Response.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}
