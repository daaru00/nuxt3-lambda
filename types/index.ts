declare global {
  interface AuthenticatedUser {
    email: string
  }

  interface ClientIdentity {
    ip?: string
    userAgent?: string
    country?: string
    region?: string
    city?: string
    postalCode?: string
    timezone?: string
  }
}

export {}
