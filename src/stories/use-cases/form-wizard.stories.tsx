/**
 * Real-World Use Case: Multi-Step Form Wizard
 *
 * Demonstrates a complete form wizard with:
 * - TabsGlass for step navigation
 * - InputGlass for form fields
 * - CheckboxGlass for agreements
 * - ButtonGlass for actions
 * - AlertGlass for validation feedback
 * - ProgressGlass for completion indicator
 *
 * Components used:
 * - TabsGlass (compound API)
 * - InputGlass
 * - CheckboxGlass
 * - ButtonGlass
 * - AlertGlass
 * - ProgressGlass
 * - GlassCard
 * - BadgeGlass
 */

import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { useTheme, type ThemeName } from '@/lib/theme-context';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import {
  TabsGlass,
  InputGlass,
  CheckboxGlass,
  ButtonGlass,
  AlertGlass,
  ProgressGlass,
  GlassCard,
  BadgeGlass,
} from '@/index';
import { User, Briefcase, CreditCard, CheckCircle, Sun, Moon, Palette } from 'lucide-react';

// ========================================
// META
// ========================================

const meta: Meta = {
  title: 'Use Cases/Form Wizard',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A multi-step registration form wizard with validation, progress tracking, and accessibility features.',
      },
    },
  },
  tags: ['use-case', 'forms', 'wizard', 'validation'],
};

export default meta;
type Story = StoryObj;

// ========================================
// THEME CONFIG
// ========================================

const themes: ThemeName[] = ['light', 'aurora', 'glass'];

const themeConfig: Record<ThemeName, { label: string; icon: typeof Sun }> = {
  light: { label: 'Light', icon: Sun },
  aurora: { label: 'Aurora', icon: Moon },
  glass: { label: 'Glass', icon: Palette },
};

// ========================================
// FORM DATA TYPES
// ========================================

interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface ProfessionalInfo {
  company: string;
  title: string;
  experience: string;
  linkedin: string;
}

interface BillingInfo {
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
  agreeToTerms: boolean;
}

// ========================================
// FORM WIZARD COMPONENT
// ========================================

const FormWizard = () => {
  const { theme, cycleTheme } = useTheme();
  const [currentStep, setCurrentStep] = useState('step1');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const nextTheme = themes[(themes.indexOf(theme) + 1) % themes.length];
  const NextIcon = themeConfig[nextTheme].icon;

  // Form data
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const [professionalInfo, setProfessionalInfo] = useState<ProfessionalInfo>({
    company: '',
    title: '',
    experience: '',
    linkedin: '',
  });

  const [billingInfo, setBillingInfo] = useState<BillingInfo>({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    agreeToTerms: false,
  });

  // Calculate progress
  const steps = ['step1', 'step2', 'step3', 'step4'];
  const currentStepIndex = steps.indexOf(currentStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  // Validation
  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!personalInfo.firstName) newErrors.firstName = 'First name is required';
    if (!personalInfo.lastName) newErrors.lastName = 'Last name is required';
    if (!personalInfo.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(personalInfo.email)) newErrors.email = 'Email is invalid';
    if (!personalInfo.phone) newErrors.phone = 'Phone is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (!professionalInfo.company) newErrors.company = 'Company is required';
    if (!professionalInfo.title) newErrors.title = 'Job title is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors: Record<string, string> = {};
    if (!billingInfo.cardNumber) newErrors.cardNumber = 'Card number is required';
    if (!billingInfo.cardName) newErrors.cardName = 'Cardholder name is required';
    if (!billingInfo.expiryDate) newErrors.expiryDate = 'Expiry date is required';
    if (!billingInfo.cvv) newErrors.cvv = 'CVV is required';
    if (!billingInfo.agreeToTerms) newErrors.agreeToTerms = 'You must agree to terms';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Navigation handlers
  const handleNext = () => {
    let isValid = false;
    if (currentStep === 'step1') isValid = validateStep1();
    else if (currentStep === 'step2') isValid = validateStep2();
    else if (currentStep === 'step3') isValid = validateStep3();

    if (isValid) {
      const nextIndex = currentStepIndex + 1;
      if (nextIndex < steps.length) {
        setCurrentStep(steps[nextIndex]);
        setErrors({});
      }
    }
  };

  const handleSubmit = () => {
    if (validateStep3()) {
      setCurrentStep('step4');
      setShowSuccess(true);
    }
  };

  return (
    <div className="min-h-screen font-sans">
      <AnimatedBackground />

      {/* Content */}
      <div className="relative z-10 p-6 flex items-center justify-center min-h-screen">
        <GlassCard intensity="high" className="w-full max-w-2xl p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                Create Your Account
              </h1>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Complete all steps to activate your premium membership
              </p>
            </div>
            <ButtonGlass variant="ghost" size="sm" icon={NextIcon} onClick={cycleTheme}>
              {themeConfig[nextTheme].label}
            </ButtonGlass>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div
              className="flex justify-between text-xs mb-2"
              style={{ color: 'var(--text-secondary)' }}
            >
              <span>
                Step {currentStepIndex + 1} of {steps.length}
              </span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <ProgressGlass value={progress} gradient="rainbow" showValue={false} />
          </div>

          {/* Form Steps */}
          <TabsGlass.Root value={currentStep} onValueChange={setCurrentStep}>
            <TabsGlass.List aria-label="Registration steps">
              <TabsGlass.Trigger value="step1" disabled={currentStepIndex < 0}>
                <User className="w-4 h-4" />
                Personal
              </TabsGlass.Trigger>
              <TabsGlass.Trigger value="step2" disabled={currentStepIndex < 1}>
                <Briefcase className="w-4 h-4" />
                Professional
              </TabsGlass.Trigger>
              <TabsGlass.Trigger value="step3" disabled={currentStepIndex < 2}>
                <CreditCard className="w-4 h-4" />
                Billing
              </TabsGlass.Trigger>
              <TabsGlass.Trigger value="step4" disabled={currentStepIndex < 3}>
                <CheckCircle className="w-4 h-4" />
                Complete
              </TabsGlass.Trigger>
            </TabsGlass.List>

            {/* Step 1: Personal Information */}
            <TabsGlass.Content value="step1" className="space-y-4 pt-6">
              <div className="grid grid-cols-2 gap-4">
                <InputGlass
                  label="First Name"
                  placeholder="John"
                  value={personalInfo.firstName}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, firstName: e.target.value })}
                  error={errors.firstName}
                  required
                />
                <InputGlass
                  label="Last Name"
                  placeholder="Doe"
                  value={personalInfo.lastName}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, lastName: e.target.value })}
                  error={errors.lastName}
                  required
                />
              </div>
              <InputGlass
                label="Email Address"
                type="email"
                placeholder="john.doe@example.com"
                value={personalInfo.email}
                onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                error={errors.email}
                required
              />
              <InputGlass
                label="Phone Number"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={personalInfo.phone}
                onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                error={errors.phone}
                required
              />
              {Object.keys(errors).length > 0 && (
                <AlertGlass variant="destructive" title="Validation Error">
                  Please fix the errors above before continuing
                </AlertGlass>
              )}
            </TabsGlass.Content>

            {/* Step 2: Professional Information */}
            <TabsGlass.Content value="step2" className="space-y-4 pt-6">
              <InputGlass
                label="Company Name"
                placeholder="Acme Inc."
                value={professionalInfo.company}
                onChange={(e) =>
                  setProfessionalInfo({ ...professionalInfo, company: e.target.value })
                }
                error={errors.company}
                required
              />
              <InputGlass
                label="Job Title"
                placeholder="Software Engineer"
                value={professionalInfo.title}
                onChange={(e) =>
                  setProfessionalInfo({ ...professionalInfo, title: e.target.value })
                }
                error={errors.title}
                required
              />
              <InputGlass
                label="Years of Experience"
                type="number"
                placeholder="5"
                value={professionalInfo.experience}
                onChange={(e) =>
                  setProfessionalInfo({
                    ...professionalInfo,
                    experience: e.target.value,
                  })
                }
              />
              <InputGlass
                label="LinkedIn Profile (Optional)"
                placeholder="https://linkedin.com/in/johndoe"
                value={professionalInfo.linkedin}
                onChange={(e) =>
                  setProfessionalInfo({ ...professionalInfo, linkedin: e.target.value })
                }
              />
              {Object.keys(errors).length > 0 && (
                <AlertGlass variant="destructive" title="Validation Error">
                  Please fix the errors above before continuing
                </AlertGlass>
              )}
            </TabsGlass.Content>

            {/* Step 3: Billing Information */}
            <TabsGlass.Content value="step3" className="space-y-4 pt-6">
              <AlertGlass variant="default" title="Secure Payment">
                Your payment information is encrypted and secure
              </AlertGlass>
              <InputGlass
                label="Card Number"
                placeholder="1234 5678 9012 3456"
                value={billingInfo.cardNumber}
                onChange={(e) => setBillingInfo({ ...billingInfo, cardNumber: e.target.value })}
                error={errors.cardNumber}
                required
              />
              <InputGlass
                label="Cardholder Name"
                placeholder="John Doe"
                value={billingInfo.cardName}
                onChange={(e) => setBillingInfo({ ...billingInfo, cardName: e.target.value })}
                error={errors.cardName}
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <InputGlass
                  label="Expiry Date"
                  placeholder="MM/YY"
                  value={billingInfo.expiryDate}
                  onChange={(e) => setBillingInfo({ ...billingInfo, expiryDate: e.target.value })}
                  error={errors.expiryDate}
                  required
                />
                <InputGlass
                  label="CVV"
                  type="password"
                  placeholder="123"
                  value={billingInfo.cvv}
                  onChange={(e) => setBillingInfo({ ...billingInfo, cvv: e.target.value })}
                  error={errors.cvv}
                  required
                />
              </div>
              <CheckboxGlass
                checked={billingInfo.agreeToTerms}
                onCheckedChange={(checked) =>
                  setBillingInfo({ ...billingInfo, agreeToTerms: !!checked })
                }
                label="I agree to the Terms of Service and Privacy Policy"
                error={errors.agreeToTerms}
              />
              {Object.keys(errors).length > 0 && (
                <AlertGlass variant="destructive" title="Validation Error">
                  Please fix the errors above before submitting
                </AlertGlass>
              )}
            </TabsGlass.Content>

            {/* Step 4: Completion */}
            <TabsGlass.Content value="step4" className="pt-6">
              {showSuccess && (
                <div className="text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-10 h-10 text-green-400" />
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                    Welcome Aboard!
                  </h2>
                  <p style={{ color: 'var(--text-secondary)' }}>
                    Your account has been successfully created
                  </p>
                  <div className="flex gap-2 justify-center flex-wrap">
                    <BadgeGlass variant="success">Premium Member</BadgeGlass>
                    <BadgeGlass variant="info">Email Verified</BadgeGlass>
                  </div>
                  <AlertGlass variant="success" title="Registration Complete">
                    Check your email for account activation instructions
                  </AlertGlass>
                </div>
              )}
            </TabsGlass.Content>
          </TabsGlass.Root>

          {/* Navigation Buttons */}
          {currentStep !== 'step4' && (
            <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
              <ButtonGlass
                variant="ghost"
                onClick={() => {
                  const prevIndex = currentStepIndex - 1;
                  if (prevIndex >= 0) {
                    setCurrentStep(steps[prevIndex]);
                    setErrors({});
                  }
                }}
                disabled={currentStepIndex === 0}
              >
                Back
              </ButtonGlass>
              <div className="flex gap-2">
                {currentStep !== 'step3' ? (
                  <ButtonGlass variant="primary" onClick={handleNext}>
                    Next Step
                  </ButtonGlass>
                ) : (
                  <ButtonGlass variant="success" onClick={handleSubmit}>
                    Complete Registration
                  </ButtonGlass>
                )}
              </div>
            </div>
          )}
        </GlassCard>
      </div>
    </div>
  );
};

// ========================================
// STORIES
// ========================================

export const Default: Story = {
  render: () => <FormWizard />,
};
