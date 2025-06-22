import { 
  signInWithPhoneNumber, 
  RecaptchaVerifier, 
  ConfirmationResult,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  User
} from 'firebase/auth';
import { auth } from '../config/firebase';

export interface UserData {
  email: string;
  phone: string;
  displayName?: string;
}

class AuthService {
  private recaptchaVerifier: RecaptchaVerifier | null = null;
  private confirmationResult: ConfirmationResult | null = null;

  // Inizializza reCAPTCHA per la verifica SMS
  initializeRecaptcha(containerId: string): void {
    if (!this.recaptchaVerifier) {
      this.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
        size: 'invisible',
        callback: () => {
          console.log('reCAPTCHA risolto');
        },
        'expired-callback': () => {
          console.log('reCAPTCHA scaduto');
        }
      });
    }
  }

  // Invia SMS di verifica REALE
  async sendSMSVerification(phoneNumber: string): Promise<void> {
    try {
      if (!this.recaptchaVerifier) {
        throw new Error('reCAPTCHA non inizializzato');
      }

      // Formato internazionale richiesto (es: +393331234567)
      const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+39${phoneNumber}`;
      
      console.log(`🔐 Invio SMS REALE a: ${formattedPhone}`);
      
      this.confirmationResult = await signInWithPhoneNumber(
        auth, 
        formattedPhone, 
        this.recaptchaVerifier
      );
      
      console.log('✅ SMS inviato con successo!');
    } catch (error: any) {
      console.error('❌ Errore invio SMS:', error);
      throw new Error(`Errore invio SMS: ${error.message}`);
    }
  }

  // Verifica il codice SMS ricevuto
  async verifySMSCode(code: string): Promise<User> {
    try {
      if (!this.confirmationResult) {
        throw new Error('Nessuna verifica SMS in corso');
      }

      const result = await this.confirmationResult.confirm(code);
      console.log('✅ Numero di telefono verificato!');
      
      return result.user;
    } catch (error: any) {
      console.error('❌ Errore verifica codice:', error);
      throw new Error(`Codice non valido: ${error.message}`);
    }
  }

  // Registrazione con email e password
  async registerWithEmail(email: string, password: string, displayName?: string): Promise<User> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      if (displayName) {
        await updateProfile(userCredential.user, { displayName });
      }
      
      return userCredential.user;
    } catch (error: any) {
      console.error('❌ Errore registrazione:', error);
      throw new Error(`Errore registrazione: ${error.message}`);
    }
  }

  // Login con email e password
  async loginWithEmail(email: string, password: string): Promise<User> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error: any) {
      console.error('❌ Errore login:', error);
      throw new Error(`Errore login: ${error.message}`);
    }
  }

  // Logout
  async logout(): Promise<void> {
    try {
      await auth.signOut();
      this.cleanup();
    } catch (error: any) {
      console.error('❌ Errore logout:', error);
      throw new Error(`Errore logout: ${error.message}`);
    }
  }

  // Pulizia risorse
  cleanup(): void {
    if (this.recaptchaVerifier) {
      this.recaptchaVerifier.clear();
      this.recaptchaVerifier = null;
    }
    this.confirmationResult = null;
  }

  // Ottieni utente corrente
  getCurrentUser(): User | null {
    return auth.currentUser;
  }
}

export const authService = new AuthService();