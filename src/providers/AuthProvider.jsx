import React, {createContext, useContext, useEffect, useState} from 'react'
import { ActivityIndicator } from 'react-native';
import { Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

const AuthContext = createContext({isAuthenticated: false,})

export default function AuthProvider({children}) {
    const [session, setSession] = useState(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
          setSession(session);
            setIsReady(true);
        })
    
        supabase.auth.onAuthStateChange((_event, session) => {
          setSession(session)
        })
      }, [])

    if(!isReady) {
        return <ActivityIndicator/>
    }

  return (
    <AuthContext.Provider
        value={{
            session,
            isAuthenticated: !!session?.user,
            userId: session?.user.id,
        }}
    >
        {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);