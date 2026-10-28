// Autentikasi absen: fingerprint (WebAuthn platform authenticator) + fallback PIN.
// WebAuthn: register kredensial per pegawai, verifikasi saat absen.

export async function registerFingerprint(employee) {
  if (!window.PublicKeyCredential) throw new Error('Perangkat tidak mendukung biometrik/WebAuthn')
  const cred = await navigator.credentials.create({
    publicKey: {
      challenge: crypto.getRandomValues(new Uint8Array(32)),
      rp: { name: 'Nusa ERP' },
      user: {
        id: new TextEncoder().encode(employee.id),
        name: employee.name,
        displayName: employee.name,
      },
      pubKeyCredParams: [{ type: 'public-key', alg: -7 }, { type: 'public-key', alg: -257 }],
      authenticatorSelection: { authenticatorAttachment: 'platform', userVerification: 'required', residentKey: 'preferred' },
      timeout: 60000,
    },
  })
  return cred.id // simpan credId di employee
}

export async function verifyFingerprint() {
  if (!window.PublicKeyCredential) throw new Error('Perangkat tidak mendukung biometrik/WebAuthn')
  await navigator.credentials.get({
    publicKey: {
      challenge: crypto.getRandomValues(new Uint8Array(32)),
      userVerification: 'required',
      timeout: 60000,
    },
  })
  return true // platform authenticator: verifikasi lokal perangkat sukses
}

export function verifyPin(employee, pin) {
  return String(employee.pin) === String(pin)
}
