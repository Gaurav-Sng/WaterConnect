import {useState} from 'react';
import { Shield,ChevronRight,Mail,Phone,CheckCircle,TrendingUp,Zap,Droplet,AlertCircle,Lock,Eye,EyeOff,User,Building2 } from 'lucide-react';
import axios from 'axios';

export const Signup = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    agreeToTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    // Calculate password strength
    if (name === 'password') {
      calculatePasswordStrength(value);
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;
    setPasswordStrength(strength);
  };

  const getPasswordStrengthColor = () => {
    const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500'];
    return colors[passwordStrength - 1] || 'bg-slate-300';
  };

  const getPasswordStrengthText = () => {
    const texts = ['Weak', 'Fair', 'Good', 'Strong'];
    return texts[passwordStrength - 1] || '';
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateStep2();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setIsLoading(true);

    axios.post('https://waterconnect.onrender.com/auth/signup', {
    email: formData.email,
    password: formData.password,
    role:selectedRole
  })
  .then((response) => {
    console.log('signup successful:', response.data);
    
    if (response.status === 200) {
      // Handle successful login
      localStorage.setItem('token', response.data.token);
      // Redirect user
    }
  })
  .catch((error) => {
    console.log("Error occurred:", error);
    // Handle errors
    if (error.response) {
      setErrors({ submit: error.response.data.message });
    }
  })
  .finally(() => {
    setIsLoading(false);
  });
      console.log('Signup submitted:', { ...formData, role: selectedRole });
   
  };

  const roleOptions = [
    {
      id: 'consumer',
      icon: <User className="w-8 h-8" />,
      title: 'I need water',
      subtitle: 'Consumer Account',
      benefits: ['Find local suppliers', 'Schedule deliveries', 'Track orders'],
      color: 'from-sky-400 to-blue-500'
    },
    {
      id: 'supplier',
      icon: <Building2 className="w-8 h-8" />,
      title: 'I supply water',
      subtitle: 'Supplier Account',
      benefits: ['Reach more customers', 'Manage deliveries', 'Grow your business'],
      color: 'from-blue-500 to-indigo-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="grid lg:grid-cols-2">
          {/* Left Section - Brand Display (Same as Login) */}
          <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-sky-400 to-blue-500 text-white">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Droplet className="w-7 h-7" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">WaterConnect</h1>
                  <p className="text-sky-100 text-sm">Pure Water, Seamlessly Connected</p>
                </div>
              </div>

              {/* Illustration */}
              <div className="my-12 relative">
                <svg viewBox="0 0 300 200" className="w-full">
                  <defs>
                    <linearGradient id="flowGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
                      <stop offset="50%" stopColor="rgba(255,255,255,0.6)" />
                      <stop offset="100%" stopColor="rgba(255,255,255,0.3)" />
                    </linearGradient>
                  </defs>
                  
                  <circle cx="60" cy="100" r="30" fill="rgba(255,255,255,0.2)" />
                  <path d="M60 70 C50 80, 40 95, 40 110 C40 125, 50 135, 60 135 C70 135, 80 125, 80 110 C80 95, 70 80, 60 70 Z" 
                        fill="white" opacity="0.4" />
                  
                  <path d="M90 100 L210 100" stroke="url(#flowGradient2)" strokeWidth="3" strokeDasharray="10,5">
                    <animate attributeName="stroke-dashoffset" from="0" to="15" dur="1s" repeatCount="indefinite" />
                  </path>
                  
                  <circle cx="240" cy="100" r="30" fill="rgba(255,255,255,0.2)" />
                  <path d="M240 70 C230 80, 220 95, 220 110 C220 125, 230 135, 240 135 C250 135, 260 125, 260 110 C260 95, 250 80, 240 70 Z" 
                        fill="white" opacity="0.4" />
                </svg>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Shield className="w-6 h-6 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold">Safe & Hygienic Water Supply</h3>
                  <p className="text-sky-100 text-sm">Certified suppliers with quality assurance</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Zap className="w-6 h-6 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold">Instant Supplier Matching</h3>
                  <p className="text-sky-100 text-sm">Smart algorithms connect you instantly</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <TrendingUp className="w-6 h-6 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold">Quick Doorstep Delivery</h3>
                  <p className="text-sky-100 text-sm">Fast and reliable service guaranteed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Signup Form */}
          <div className="p-8 lg:p-12">
            <div className="max-w-md mx-auto">
              {/* Mobile Logo */}
              <div className="lg:hidden flex items-center gap-2 mb-8">
                <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-blue-500 rounded-lg flex items-center justify-center">
                  <Droplet className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-slate-800">WaterConnect</span>
              </div>

              {/* Progress Indicator */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-600">Step {currentStep} of 2</span>
                  <span className="text-sm text-slate-500">{currentStep === 1 ? 'Role Selection' : 'Account Details'}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-sky-400 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(currentStep / 2) * 100}%` }}
                  />
                </div>
              </div>

              {/* Step 1: Role Selection */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-fadeIn">
                  <div>
                    <h2 className="text-3xl font-bold text-slate-800 mb-2">Join WaterConnect as...</h2>
                    <p className="text-slate-600">Select how you want to use our platform</p>
                  </div>

                  <div className="space-y-4">
                    {roleOptions.map((role) => (
                      <button
                        key={role.id}
                        onClick={() => setSelectedRole(role.id)}
                        className={`w-full p-6 border-2 rounded-xl text-left transition-all transform hover:scale-[1.02] ${
                          selectedRole === role.id
                            ? 'border-sky-400 bg-sky-50 shadow-lg'
                            : 'border-slate-200 hover:border-sky-300 hover:shadow-md'
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div
                            className={`w-14 h-14 bg-gradient-to-br ${role.color} rounded-xl flex items-center justify-center text-white flex-shrink-0`}
                          >
                            {role.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-slate-800 mb-1">{role.title}</h3>
                            <p className="text-sm text-slate-500 mb-3">{role.subtitle}</p>
                            <ul className="space-y-1.5">
                              {role.benefits.map((benefit, idx) => (
                                <li key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                                  <CheckCircle className={`w-4 h-4 flex-shrink-0 ${selectedRole === role.id ? 'text-sky-500' : 'text-slate-400'}`} />
                                  {benefit}
                                </li>
                              ))}
                            </ul>
                          </div>
                          {selectedRole === role.id && (
                            <div className="flex-shrink-0">
                              <div className="w-6 h-6 bg-sky-400 rounded-full flex items-center justify-center">
                                <CheckCircle className="w-5 h-5 text-white" />
                              </div>
                            </div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setCurrentStep(2)}
                    disabled={!selectedRole}
                    className="w-full py-3 bg-sky-400 text-white font-semibold rounded-lg hover:bg-sky-500 focus:outline-none focus:ring-4 focus:ring-sky-200 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    Continue
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  <div className="text-center pt-4 border-t border-slate-200">
                    <p className="text-slate-600">
                      Already have an account?{' '}
                      <a href="/login" className="text-sky-500 hover:text-sky-600 font-semibold">
                        Sign In
                      </a>
                    </p>
                  </div>
                </div>
              )}

              {/* Step 2: Account Details */}
              {currentStep === 2 && (
                <div className="space-y-5 animate-fadeIn">
                  <div>
                    <h2 className="text-3xl font-bold text-slate-800 mb-2">Create Your Account</h2>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-slate-600">Signing up as:</span>
                      <span className="px-3 py-1 bg-sky-100 text-sky-600 rounded-full font-medium">
                        {selectedRole === 'consumer' ? 'Consumer' : 'Supplier'}
                      </span>
                      <button
                        onClick={() => setCurrentStep(1)}
                        className="text-sky-500 hover:text-sky-600 font-medium"
                      >
                        Change
                      </button>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Full Name */}
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-slate-700 mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                            errors.fullName
                              ? 'border-red-300 focus:ring-red-200'
                              : 'border-slate-300 focus:ring-sky-200 focus:border-sky-400'
                          }`}
                          placeholder="John Doe"
                        />
                      </div>
                      {errors.fullName && (
                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                            errors.email
                              ? 'border-red-300 focus:ring-red-200'
                              : 'border-slate-300 focus:ring-sky-200 focus:border-sky-400'
                          }`}
                          placeholder="your.email@example.com"
                        />
                      </div>
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Phone (Optional) */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                        Phone Number <span className="text-slate-400">(Optional)</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400 transition-all"
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          className={`w-full pl-11 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                            errors.password
                              ? 'border-red-300 focus:ring-red-200'
                              : 'border-slate-300 focus:ring-sky-200 focus:border-sky-400'
                          }`}
                          placeholder="Create a strong password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      {formData.password && (
                        <div className="mt-2">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                              <div
                                className={`h-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                                style={{ width: `${(passwordStrength / 4) * 100}%` }}
                              />
                            </div>
                            {passwordStrength > 0 && (
                              <span className="text-xs font-medium text-slate-600">
                                {getPasswordStrengthText()}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                      {errors.password && (
                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.password}
                        </p>
                      )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 mb-2">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          id="confirmPassword"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className={`w-full pl-11 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                            errors.confirmPassword
                              ? 'border-red-300 focus:ring-red-200'
                              : 'border-slate-300 focus:ring-sky-200 focus:border-sky-400'
                          }`}
                          placeholder="Re-enter your password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                          {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.confirmPassword}
                        </p>
                      )}
                    </div>

                    {/* Terms Agreement */}
                    <div>
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          name="agreeToTerms"
                          checked={formData.agreeToTerms}
                          onChange={handleChange}
                          className="w-5 h-5 text-sky-400 border-slate-300 rounded focus:ring-sky-200 mt-0.5"
                        />
                        <span className="text-sm text-slate-600">
                          I agree to the{' '}
                          <a href="#terms" className="text-sky-500 hover:text-sky-600 font-medium">
                            Terms of Service
                          </a>{' '}
                          and{' '}
                          <a href="#privacy" className="text-sky-500 hover:text-sky-600 font-medium">
                            Privacy Policy
                          </a>
                        </span>
                      </label>
                      {errors.agreeToTerms && (
                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.agreeToTerms}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3 bg-sky-400 text-white font-semibold rounded-lg hover:bg-sky-500 focus:outline-none focus:ring-4 focus:ring-sky-200 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Creating Account...
                        </>
                      ) : (
                        <>
                          Create Account
                          <ChevronRight className="w-5 h-5" />
                        </>
                      )}
                    </button>

                    {/* Social Login */}
                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-slate-300"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white text-slate-500">Or sign up with</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        className="py-3 px-4 border border-slate-300 rounded-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-2 text-slate-700 font-medium"
                      >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        Google
                      </button>
                      <button
                        type="button"
                        className="py-3 px-4 border border-slate-300 rounded-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-2 text-slate-700 font-medium"
                      >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/>
                        </svg>
                        Facebook
                      </button>
                    </div>

                    {/* Back & Sign In Link */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        className="text-slate-600 hover:text-slate-800 font-medium flex items-center gap-1"
                      >
                        <ChevronRight className="w-5 h-5 rotate-180" />
                        Back
                      </button>
                      <p className="text-slate-600">
                        Already have an account?{' '}
                        <a href="/login" className="text-sky-500 hover:text-sky-600 font-semibold">
                          Sign In
                        </a>
                      </p>
                    </div>
                  </form>
                </div>
              )}

              {/* Support Link */}
              <div className="mt-6 text-center">
                <a href="#support" className="text-sm text-slate-500 hover:text-slate-700">
                  Need help? Contact Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap');
        
        * {
          font-family: 'Inter', sans-serif;
        }
        
        h1, h2, h3, h4, h5, h6 {
          font-family: 'Poppins', sans-serif;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};

