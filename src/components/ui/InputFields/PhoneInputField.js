import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function PhoneInputField({ value, onChange, label }) {
  return (
    <div className="mb-3">
      <label className="block !w-[744px] text-sm font-medium mb-1">{label}</label>
      <PhoneInput
        country={'us'}
        value={value}
        onChange={onChange}
        dropdownClass="z-50"
        placeholder="Phone number"
      />
    </div>
  );
}
