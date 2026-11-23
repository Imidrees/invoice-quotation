import QRCode from 'qrcode';

/**
 * Saudi VAT Invoice QR Code (Phase 1)
 * TLV (Tag-Length-Value) encoding format
 *
 * Five values required:
 * 1. Seller name
 * 2. Seller VAT registration number
 * 3. Invoice date/time (ISO 8601)
 * 4. Invoice total including VAT
 * 5. VAT amount
 */

interface QRPayload {
  sellerName: string;
  sellerVATNumber: string;
  invoiceDateTime: string; // ISO 8601
  invoiceTotal: string; // decimal string
  vatAmount: string; // decimal string
}

function encodeTagLengthValue(tag: number, value: string): Buffer {
  const valueBuffer = Buffer.from(value, 'utf-8');
  const length = valueBuffer.length;

  if (length > 255) {
    throw new Error(`Value too long for TLV encoding: ${length} bytes`);
  }

  const tlv = Buffer.alloc(2 + length);
  tlv[0] = tag;
  tlv[1] = length;
  valueBuffer.copy(tlv, 2);

  return tlv;
}

export function encodeQRPayload(payload: QRPayload): Buffer {
  const tlvs = [
    encodeTagLengthValue(1, payload.sellerName),
    encodeTagLengthValue(2, payload.sellerVATNumber),
    encodeTagLengthValue(3, payload.invoiceDateTime),
    encodeTagLengthValue(4, payload.invoiceTotal),
    encodeTagLengthValue(5, payload.vatAmount),
  ];

  return Buffer.concat(tlvs);
}

export function decodeQRPayload(buffer: Buffer): QRPayload | null {
  try {
    const payload: Partial<QRPayload> = {};
    let offset = 0;

    while (offset < buffer.length) {
      const tag = buffer[offset];
      const length = buffer[offset + 1];
      const value = buffer.toString('utf-8', offset + 2, offset + 2 + length);

      switch (tag) {
        case 1:
          payload.sellerName = value;
          break;
        case 2:
          payload.sellerVATNumber = value;
          break;
        case 3:
          payload.invoiceDateTime = value;
          break;
        case 4:
          payload.invoiceTotal = value;
          break;
        case 5:
          payload.vatAmount = value;
          break;
      }

      offset += 2 + length;
    }

    if (
      payload.sellerName &&
      payload.sellerVATNumber &&
      payload.invoiceDateTime &&
      payload.invoiceTotal &&
      payload.vatAmount
    ) {
      return payload as QRPayload;
    }

    return null;
  } catch {
    return null;
  }
}

export async function generateQRCode(
  payload: QRPayload,
  options?: QRCode.QRCodeToDataURLOptions
): Promise<string> {
  const tlvBuffer = encodeQRPayload(payload);
  const base64 = tlvBuffer.toString('base64');

  return QRCode.toDataURL(base64, {
    errorCorrectionLevel: 'M',
    type: 'image/png',
    width: 200,
    margin: 10,
    ...options,
  });
}

export function createQRPayload(
  sellerName: string,
  sellerVATNumber: string,
  invoiceDateTime: Date,
  invoiceTotal: string,
  vatAmount: string
): QRPayload {
  return {
    sellerName,
    sellerVATNumber,
    invoiceDateTime: invoiceDateTime.toISOString(),
    invoiceTotal,
    vatAmount,
  };
}
