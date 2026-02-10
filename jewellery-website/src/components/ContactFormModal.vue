<template>
  <Teleport to="body">
    <div v-if="isOpen" class="modal-overlay" @click.self="$emit('close')">
      <div class="modal-container">
        <div class="modal-header">
          <h2>Email Enquiry</h2>
          <button class="close-btn" @click="$emit('close')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <form @submit.prevent="handleSubmit" class="enquiry-form">
          <div class="form-group">
            <label for="name">Full Name</label>
            <input 
              type="text" 
              id="name" 
              v-model="formData.name" 
              @blur="touched.name = true"
              :class="{ 'error-input': touched.name && !formData.name.trim() }"
              placeholder="Your Name"
            />
            <span v-if="touched.name && !formData.name.trim()" class="error-text">Please enter your name</span>
          </div>

          <div class="form-group">
            <label for="email">Email Address</label>
            <input 
              type="email" 
              id="email" 
              v-model="formData.email" 
              @blur="touched.email = true"
              :class="{ 'error-input': touched.email && !isEmailValid }"
              placeholder="your@email.com"
            />
            <span v-if="touched.email && !formData.email.trim()" class="error-text">Email is required</span>
            <span v-else-if="touched.email && !isEmailValid" class="error-text">Please enter a valid email address</span>
          </div>

          <div class="form-group">
            <label for="subject">Subject</label>
            <input 
              type="text" 
              id="subject" 
              v-model="formData.subject" 
              @blur="touched.subject = true"
              :class="{ 'error-input': touched.subject && !formData.subject.trim() }"
              placeholder="Enquiry Subject"
            />
            <span v-if="touched.subject && !formData.subject.trim()" class="error-text">Subject is required</span>
          </div>

          <div class="form-group">
            <label for="message">Message</label>
            <textarea 
              id="message" 
              v-model="formData.message" 
              @blur="touched.message = true"
              :class="{ 'error-input': touched.message && !formData.message.trim() }"
              rows="4" 
              placeholder="How can we help you?"
            ></textarea>
            <span v-if="touched.message && !formData.message.trim()" class="error-text">Message cannot be empty</span>
          </div>

          <button type="submit" class="submit-btn" :disabled="!isFormValid || isSending">
            <span v-if="!isSending">{{ submitStatus }}</span>
            <span v-else class="loader"></span>
          </button>
        </form>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, reactive, watch, computed } from 'vue'
import emailjs from '@emailjs/browser'

const props = defineProps({
  isOpen: Boolean,
  initialSubject: String,
  productName: String
})

const emit = defineEmits(['close'])

const formData = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY)

const touched = reactive({
  name: false,
  email: false,
  subject: false,
  message: false
})

const isSending = ref(false)
const submitStatus = ref('Send Message')

const isEmailValid = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(formData.email)
})

const isFormValid = computed(() => {
  return (
    formData.name.trim() !== '' &&
    isEmailValid.value &&
    formData.subject.trim() !== '' &&
    formData.message.trim() !== ''
  )
})

// Update subject and reset form when modal opens/closes
watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    formData.subject = props.initialSubject || ''
    formData.message = props.productName ? `Hi, I am interested in ${props.productName}. Please provide more details.` : ''
    submitStatus.value = 'Send Message'
  } else {
    // Reset all fields on close
    formData.name = ''
    formData.email = ''
    formData.subject = ''
    formData.message = ''
    
    // Reset touched state
    Object.keys(touched).forEach(key => touched[key] = false)
  }
})

const handleSubmit = async () => {
  isSending.value = true
  
  try {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    if (!serviceId || !templateId || !publicKey) {
      throw new Error('EmailJS credentials are missing in .env file')
    }

    await emailjs.send(serviceId, templateId, formData, publicKey)

    submitStatus.value = 'Message Sent!'
    setTimeout(() => {
      emit('close')
      // Reset form
      formData.name = ''
      formData.email = ''
      formData.subject = ''
      formData.message = ''
    }, 2000)

  } catch (error) {
    console.error('Email sending failed:', error)
    submitStatus.value = 'Error! Try again'
  } finally {
    isSending.value = false
  }
}
</script>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1.5rem;
}

.modal-container {
  background: #fff;
  width: 100%;
  max-width: 500px;
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  animation: modalEnter 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes modalEnter {
  from { opacity: 0; transform: translateY(20px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #111;
    margin: 0;
  }

  .close-btn {
    background: none;
    border: none;
    color: #888;
    cursor: pointer;
    padding: 0.5rem;
    transition: color 0.2s ease;

    &:hover { color: #000; }
    svg { width: 24px; height: 24px; }
  }
}

.enquiry-form {
  .form-group {
    margin-bottom: 1.5rem;

    label {
      display: block;
      font-size: 0.9rem;
      font-weight: 600;
      color: #444;
      margin-bottom: 0.5rem;
    }

    input, textarea {
      width: 92%;
      padding: 0.85rem 1rem;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      font-family: inherit;
      font-size: 0.95rem;
      transition: all 0.2s ease;

      &:focus {
        outline: none;
        border-color: #d4af37;
        box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.1);
      }

      &.error-input {
        border-color: #ff4d4f;
        
        &:focus {
          box-shadow: 0 0 0 3px rgba(255, 77, 79, 0.1);
        }
      }
    }

    .error-text {
      display: block;
      color: #ff4d4f;
      font-size: 0.8rem;
      margin-top: 0.4rem;
      font-weight: 500;
    }

    textarea { resize: none; }
  }
}

.submit-btn {
  width: 100%;
  background: #000;
  color: #fff;
  border: none;
  padding: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 52px;

  &:hover:not(:disabled) {
    background: #d4af37;
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
}

.loader {
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 480px) {
  .modal-container {
    padding: 1.5rem;
  }
}
</style>
