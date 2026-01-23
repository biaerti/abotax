// Mock Base44 client - projekt jest migrowany z Base44 do Supabase
// Ten plik zapewnia kompatybilność wsteczną podczas migracji

export const base44 = {
  auth: {
    isAuthenticated: async () => false,
    me: async () => null,
    login: async () => {},
    logout: async () => {},
  },
  // Dodaj inne metody jeśli będą potrzebne
}

export default base44
