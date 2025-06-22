# 🔐 CyberSec Hub - Firebase SMS Authentication

## 🚀 Configurazione Firebase

### 1. Crea un progetto Firebase
1. Vai su [Firebase Console](https://console.firebase.google.com/)
2. Clicca "Crea un progetto"
3. Segui la procedura guidata

### 2. Configura Authentication
1. Nel tuo progetto Firebase, vai su "Authentication"
2. Clicca "Inizia"
3. Vai su "Sign-in method"
4. Abilita "Phone" come provider di accesso
5. Abilita anche "Email/Password"

### 3. Ottieni la configurazione
1. Vai su "Project Settings" (icona ingranaggio)
2. Scorri fino a "Your apps"
3. Clicca "Add app" e seleziona "Web" (</>) 
4. Registra l'app con un nome
5. Copia la configurazione `firebaseConfig`

### 4. Configura il progetto
1. Apri `src/config/firebase.ts`
2. Sostituisci i valori placeholder con la tua configurazione:

```typescript
const firebaseConfig = {
  apiKey: "la-tua-api-key",
  authDomain: "tuo-progetto.firebaseapp.com",
  projectId: "tuo-progetto-id",
  storageBucket: "tuo-progetto.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};
```

### 5. Configura domini autorizzati
1. In Firebase Console, vai su "Authentication" > "Settings"
2. Nella sezione "Authorized domains", aggiungi:
   - `localhost` (per sviluppo)
   - Il tuo dominio di produzione

## 🔥 Funzionalità

### ✅ Autenticazione completa
- **Registrazione con email e password**
- **Verifica numero di telefono con SMS REALI**
- **Login sicuro**
- **Gestione stato utente**

### 📱 SMS Verification
- Invio SMS reali tramite Firebase
- Codici a 6 cifre
- Verifica automatica
- Gestione errori completa

### 🛡️ Sicurezza
- reCAPTCHA integrato per prevenire spam
- Validazione lato client e server
- Gestione sicura delle sessioni
- Logout completo

### 🎨 Design
- Tema cyberpunk con animazioni Matrix
- Interfaccia responsive
- Effetti glitch e neon
- Loading states professionali

## 🚀 Come usare

1. **Configura Firebase** (vedi sopra)
2. **Avvia il progetto**: `npm run dev`
3. **Registrati** con email e password
4. **Verifica il telefono** - riceverai un SMS REALE
5. **Accedi alla dashboard** con strumenti di cybersecurity

## 📋 Requisiti SMS

- **Formato numero**: +393331234567 (con prefisso internazionale)
- **Paesi supportati**: Tutti i paesi supportati da Firebase
- **Limiti**: Firebase ha quote gratuite, poi a pagamento

## 🔧 Troubleshooting

### SMS non arriva?
1. Controlla che il numero sia in formato internazionale
2. Verifica che il paese sia supportato
3. Controlla la console Firebase per errori
4. Assicurati che reCAPTCHA funzioni

### Errori di configurazione?
1. Verifica che tutti i campi in `firebase.ts` siano corretti
2. Controlla che Authentication sia abilitato
3. Verifica i domini autorizzati

## 🎯 Prossimi passi

- Aggiungere database Firestore per salvare dati utente
- Implementare ruoli e permessi
- Aggiungere autenticazione a due fattori
- Integrare analytics

---

**⚠️ IMPORTANTE**: Questo è un progetto educativo. Gli strumenti di cybersecurity sono solo per dimostrazione e scopi educativi legali.