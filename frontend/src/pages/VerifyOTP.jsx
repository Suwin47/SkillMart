import AuthLayout from "../components/auth/AuthLayout";
import OtpVerificationForm from "../components/auth/OtpVerificationForm";

function VerifyOTP() {
  return (
    <AuthLayout
      title="Verify Your Email 🔐"
      subtitle="Enter the 6-digit verification code sent to your email."
    >
      <OtpVerificationForm />
    </AuthLayout>
  );
}

export default VerifyOTP;