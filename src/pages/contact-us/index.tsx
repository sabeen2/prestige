import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import {
  Mail,
  MapPin,
  Send,
  AlertCircle,
  CheckCircle,
  Loader2,
  User,
  Calendar,
  Shield,
} from "lucide-react";
import { socialLinks } from "@/components/layout/footer";
import { useContactForm, IContactFormData } from "@/hooks/useContactForm";

// TypeScript interfaces
interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  subject?: string;
  message?: string;
}

interface ContactInfo {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  content: string[];
  color: string;
  bgColor: string;
}

interface SocialLink {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  color: string;
}

// Enhanced form validation
const validateForm = (formData: IContactFormData): FormErrors => {
  const errors: FormErrors = {};

  // Name validation
  if (!formData.name.trim()) {
    errors.name = "नाम आवश्यक छ";
  } else if (formData.name.trim().length < 2) {
    errors.name = "नाम कम्तिमा २ अक्षर हुनुपर्छ";
  }

  // Phone validation
  if (!formData.phone.trim()) {
    errors.phone = "फोन नम्बर आवश्यक छ";
  } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/[\s\-\(\)]/g, ""))) {
    errors.phone = "वैध फोन नम्बर प्रविष्ट गर्नुहोस्";
  }

  // Email validation
  if (!formData.email.trim()) {
    errors.email = "इमेल ठेगाना आवश्यक छ";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = "वैध इमेल ठेगाना प्रविष्ट गर्नुहोस्";
  }

  // Subject validation
  if (!formData.subject) {
    errors.subject = "विषय छान्नुहोस्";
  }

  // Message validation
  if (!formData.message.trim()) {
    errors.message = "सन्देश आवश्यक छ";
  } else if (formData.message.trim().length < 10) {
    errors.message = "सन्देश कम्तिमा १० अक्षर हुनुपर्छ";
  }

  return errors;
};

export default function ContactPage() {
  const {
    formData,
    isSubmitting,
    submitted,
    error,
    handleInputChange,
    handleSubmit,
    resetForm,
  } = useContactForm();

  const [errors, setErrors] = React.useState<FormErrors>({});

  const handleSelectChange = (value: string) => {
    // Create a synthetic event for the hook's handleInputChange
    const syntheticEvent = {
      target: {
        name: "subject",
        value: value,
      },
    } as React.ChangeEvent<HTMLSelectElement>;

    handleInputChange(syntheticEvent);

    // Clear validation error for subject
    if (errors.subject) {
      setErrors((prev) => ({ ...prev, subject: "" }));
    }
  };

  const handleInputChangeWithValidation = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target;

    // Call the hook's handleInputChange
    handleInputChange(e);

    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmitWithValidation = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Clear validation errors
    setErrors({});

    // Call the hook's handleSubmit
    handleSubmit(e);
  };

  const handleReset = () => {
    resetForm();
    setErrors({});
  };

  const contactInfo: ContactInfo[] = [
    {
      icon: MapPin,
      title: "कार्यालयको ठेगाना",
      content: ["भरतपुर - चितवन, नेपाल"],
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: Mail,
      title: "इमेल ठेगाना",
      content: ["info@prestigejournalmedia.com"],
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl sm:text-2xl flex items-center gap-2">
                  <User className="h-5 w-5" />
                  सम्पर्क विवरण
                </CardTitle>
                <CardDescription className="text-sm">
                  हामीसँग सम्पर्क गर्ने विभिन्न माध्यमहरू
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactInfo.map((item, index) => (
                  <div
                    key={index}
                    className="group flex items-start gap-3 p-3 rounded-xl border border-slate-200 bg-white hover:shadow-md transition-all duration-200 hover:border-primary/20"
                  >
                    <div
                      className={`p-2 rounded-lg ${item.bgColor} ${item.color} group-hover:scale-105 transition-transform`}
                    >
                      <item.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm text-foreground mb-1">
                        {item.title}
                      </h3>
                      <div className="space-y-0.5">
                        {item.content.map((line, i) => (
                          <p
                            key={i}
                            className="text-xs text-muted-foreground leading-relaxed"
                          >
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  सामाजिक सञ्जाल
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {socialLinks.map((social, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(social.href, "_blank")}
                      className={`flex items-center gap-2 text-xs hover:bg-slate-50 ${social.color} transition-colors`}
                    >
                      <social.icon className="h-3 w-3" />
                      {social.label}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl sm:text-2xl flex items-center gap-2">
                  <Send className="h-5 w-5" />
                  सन्देश पठाउनुहोस्
                </CardTitle>
                <CardDescription className="text-sm">
                  तपाईंको सन्देश हामीलाई पठाउनुहोस्। हामी २४ घण्टा भित्र जवाफ
                  दिनेछौं।
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Error Message */}
                {error && (
                  <Alert
                    variant="destructive"
                    className="border-red-200 bg-red-50"
                  >
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="flex items-center justify-between">
                      <span className="text-sm">{error}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleReset}
                        className="ml-4 text-xs"
                      >
                        पुनः प्रयास
                      </Button>
                    </AlertDescription>
                  </Alert>
                )}

                {submitted ? (
                  <div className="text-center py-8 sm:py-12 space-y-4">
                    <div className="mx-auto w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-7 w-7 text-green-600" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">धन्यवाद!</h3>
                      <p className="text-sm text-muted-foreground max-w-md mx-auto">
                        तपाईंको सन्देश सफलतापूर्वक पठाइयो। हामी चाँडै तपाईंलाई
                        जवाफ दिनेछौं।
                      </p>
                    </div>
                    <Button
                      onClick={handleReset}
                      variant="outline"
                      className="mt-4"
                    >
                      नयाँ सन्देश पठाउनुहोस्
                    </Button>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmitWithValidation}
                    className="space-y-4 sm:space-y-6"
                  >
                    <div className="grid sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-medium">
                          पूरा नाम *
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChangeWithValidation}
                          placeholder="तपाईंको पूरा नाम"
                          className={`${
                            errors.name
                              ? "border-red-500 focus:border-red-500"
                              : ""
                          }`}
                        />
                        {errors.name && (
                          <p className="text-xs text-red-600 mt-1">
                            {errors.name}
                          </p>
                        )}
                      </div>

                      {/* Phone */}
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-medium">
                          फोन नम्बर *
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChangeWithValidation}
                          placeholder="९८XXXXXXXX"
                          className={`${
                            errors.phone
                              ? "border-red-500 focus:border-red-500"
                              : ""
                          }`}
                        />
                        {errors.phone && (
                          <p className="text-xs text-red-600 mt-1">
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">
                        इमेल ठेगाना *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChangeWithValidation}
                        placeholder="example@email.com"
                        className={`${
                          errors.email
                            ? "border-red-500 focus:border-red-500"
                            : ""
                        }`}
                      />
                      {errors.email && (
                        <p className="text-xs text-red-600 mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Subject */}
                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-sm font-medium">
                        विषय *
                      </Label>
                      <Select
                        value={formData.subject}
                        onValueChange={handleSelectChange}
                      >
                        <SelectTrigger
                          className={`w-full ${
                            errors.subject ? "border-red-500" : ""
                          }`}
                        >
                          <SelectValue placeholder="विषय छान्नुहोस्" />
                        </SelectTrigger>
                        <SelectContent className="w-full">
                          <SelectItem value="news-tip">समाचार सुझाव</SelectItem>
                          <SelectItem value="complaint">गुनासो</SelectItem>
                          <SelectItem value="suggestion">सुझाव</SelectItem>
                          <SelectItem value="advertisement">
                            विज्ञापन सम्बन्धी
                          </SelectItem>
                          <SelectItem value="technical">
                            प्राविधिक समस्या
                          </SelectItem>
                          <SelectItem value="partnership">साझेदारी</SelectItem>
                          <SelectItem value="other">अन्य</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.subject && (
                        <p className="text-xs text-red-600 mt-1">
                          {errors.subject}
                        </p>
                      )}
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-sm font-medium">
                        सन्देश *
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChangeWithValidation}
                        placeholder="तपाईंको सन्देश यहाँ लेख्नुहोस्..."
                        rows={4}
                        className={`resize-none ${
                          errors.message
                            ? "border-red-500 focus:border-red-500"
                            : ""
                        }`}
                      />
                      {errors.message && (
                        <p className="text-xs text-red-600 mt-1">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    <Separator className="my-4" />

                    {/* Privacy Notice */}
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                      <div className="flex items-start gap-2">
                        <Shield className="h-4 w-4 text-slate-600 mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-slate-600 leading-relaxed">
                          <strong>गोपनीयता सूचना:</strong> तपाईंले प्रदान
                          गर्नुभएको जानकारी हामी गोप्य राख्नेछौं र केवल तपाईंको
                          प्रश्नको जवाफ दिनका लागि मात्र प्रयोग गर्नेछौं।
                        </p>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end pt-2">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="min-w-[180px] bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            पठाइँदै...
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Send className="h-4 w-4" />
                            सन्देश पठाउनुहोस्
                          </div>
                        )}
                      </Button>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
