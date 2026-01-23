import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not configured. Using mock data.')
}

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Helper hooks for common operations
export const db = {
  // Childrens Homes
  homes: {
    async list(limit = 50) {
      if (!supabase) return []
      const { data, error } = await supabase
        .from('childrens_homes')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit)
      if (error) throw error
      return data
    },
    async getById(id) {
      if (!supabase) return null
      const { data, error } = await supabase
        .from('childrens_homes')
        .select('*')
        .eq('id', id)
        .single()
      if (error) throw error
      return data
    },
    async create(home) {
      if (!supabase) throw new Error('Supabase not configured')
      const { data, error } = await supabase
        .from('childrens_homes')
        .insert([home])
        .select()
        .single()
      if (error) throw error
      return data
    }
  },

  // Goals
  goals: {
    async listByHome(homeId) {
      if (!supabase) return []
      const { data, error } = await supabase
        .from('goals')
        .select('*')
        .eq('home_id', homeId)
        .order('created_at', { ascending: false })
      if (error) throw error
      return data
    },
    async listActive(limit = 20) {
      if (!supabase) return []
      const { data, error } = await supabase
        .from('goals')
        .select('*, childrens_homes(*)')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(limit)
      if (error) throw error
      return data
    }
  },

  // Contributions
  contributions: {
    async listRecent(limit = 100) {
      if (!supabase) return []
      const { data, error } = await supabase
        .from('contributions')
        .select('*, goals(*)')
        .order('created_at', { ascending: false })
        .limit(limit)
      if (error) throw error
      return data
    },
    async create(contribution) {
      if (!supabase) throw new Error('Supabase not configured')
      const { data, error } = await supabase
        .from('contributions')
        .insert([contribution])
        .select()
        .single()
      if (error) throw error
      return data
    }
  },

  // Home Updates
  updates: {
    async listByHome(homeId, limit = 10) {
      if (!supabase) return []
      const { data, error } = await supabase
        .from('home_updates')
        .select('*')
        .eq('home_id', homeId)
        .order('created_at', { ascending: false })
        .limit(limit)
      if (error) throw error
      return data
    }
  },

  // Petition Signatures
  petition: {
    async getCount() {
      if (!supabase) return 12847 // Mock count
      const { count, error } = await supabase
        .from('petition_signatures')
        .select('*', { count: 'exact', head: true })
      if (error) throw error
      return count || 0
    },
    async sign(signature) {
      if (!supabase) throw new Error('Supabase not configured')
      const { data, error } = await supabase
        .from('petition_signatures')
        .insert([signature])
        .select()
        .single()
      if (error) throw error
      return data
    },
    async listPublic(limit = 50) {
      if (!supabase) return []
      const { data, error } = await supabase
        .from('petition_signatures')
        .select('first_name, city, created_at')
        .eq('is_public', true)
        .order('created_at', { ascending: false })
        .limit(limit)
      if (error) throw error
      return data
    },
    // Real-time subscription for signature count
    subscribeToCount(callback) {
      if (!supabase) return () => {}
      const channel = supabase
        .channel('petition-count')
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'petition_signatures' },
          () => {
            this.getCount().then(callback)
          }
        )
        .subscribe()

      return () => supabase.removeChannel(channel)
    }
  }
}

export default supabase
