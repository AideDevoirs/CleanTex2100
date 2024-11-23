import React, { useState } from 'react';

import emailjs from 'emailjs-com';

import config from '../config/index.json';

interface FormData {
  vehicleType?: string;
  carpetWidth?: string;
  carpetLength?: string;
  otherDetails?: string;
  phoneNumber?: string;
  email?: string;
  appointmentDate?: string;
}

const Pricing = () => {
  const { pricing } = config;

  const [selectedType, setSelectedType] = useState<string>('');
  const [contactChoice, setContactChoice] = useState<string[]>([]);
  const [formData, setFormData] = useState<FormData>({
    vehicleType: '',
    carpetWidth: '',
    carpetLength: '',
    otherDetails: '',
    phoneNumber: '',
    email: '',
    appointmentDate: '',
  });
  const [errors, setErrors] = useState<
    Partial<FormData & { cleaningType: string; contactChoice: string }>
  >({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(e.target.value);
    setFormData((prev) => ({
      ...prev,
      vehicleType: '',
      carpetWidth: '',
      carpetLength: '',
      otherDetails: '',
    }));
    setErrors({});
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setContactChoice((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
    setErrors({ ...errors, contactChoice: '' });
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<
      FormData & { cleaningType: string; contactChoice: string }
    > = {};

    if (!selectedType) {
      newErrors.cleaningType = 'Kies een type schoonmaak.';
    }

    if (selectedType === 'car' && !formData.vehicleType) {
      newErrors.vehicleType = 'Vul het type voertuig in.';
    }

    if (selectedType === 'carpet') {
      if (!formData.carpetWidth) {
        newErrors.carpetWidth = 'Vul de breedte in.';
      }
      if (!formData.carpetLength) {
        newErrors.carpetLength = 'Vul de lengte in.';
      }
    }

    if (selectedType === 'other' && !formData.otherDetails) {
      newErrors.otherDetails = 'Geef meer details.';
    }

    if (!contactChoice.length) {
      newErrors.contactChoice = 'Kies minstens één contactoptie.';
    }

    if (contactChoice.includes('phoneNumber') && !formData.phoneNumber) {
      newErrors.phoneNumber = 'Vul het telefoonnummer in.';
    }

    if (contactChoice.includes('email') && !formData.email) {
      newErrors.email = 'Vul het e-mailadres in.';
    }

    if (!formData.appointmentDate) {
      newErrors.appointmentDate = 'Kies een afspraakdatum.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Envoi de l'email via EmailJS
    emailjs
      .send(
        'service_xrdardf', // Remplacez par votre service ID
        'template_wwt8z7z', // Remplacez par votre template ID
        {
          vehicleType: formData.vehicleType,
          carpetWidth: formData.carpetWidth,
          carpetLength: formData.carpetLength,
          otherDetails: formData.otherDetails,
          phoneNumber: formData.phoneNumber,
          email: formData.email,
          appointmentDate: formData.appointmentDate,
          contactChoice: contactChoice.join(', '),
        },
        'OT2zf8nW_mXJjq6V9' // Remplacez par votre user ID
      )
      .then(
        (result) => {
          console.log('Email envoyé avec succès:', result.text);
          setIsSubmitted(true); // Affichage de la confirmation
        },
        (error) => {
          console.error("Erreur lors de l'envoi de l'email:", error.text);
        }
      );
  };

  return (
    <section className="bg-background py-8" id="cleaning-form">
      <div id="pricing" className="container mx-auto px-4">
        <h1 className="text-5xl font-bold text-center text-primary mb-6">
          {pricing.title}
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-lg mx-auto"
        >
          {/* Type schoonmaak */}
          <div className="mb-4">
            <label
              htmlFor="cleaningType"
              className="block text-gray-700 font-bold mb-2"
            >
              Type schoonmaak
            </label>
            <select
              id="cleaningType"
              name="cleaningType"
              value={selectedType}
              onChange={handleTypeChange}
              className={`block w-full bg-white border ${
                errors.cleaningType ? 'border-red-500' : 'border-gray-300'
              } rounded py-2 px-3 leading-tight focus:outline-none focus:border-primary`}
            >
              <option value="">Selecteer een type</option>
              <option value="car">Auto</option>
              <option value="carpet">Tapijt</option>
              <option value="other">Anders</option>
            </select>
            {errors.cleaningType && (
              <p className="text-red-500 text-sm mt-1">{errors.cleaningType}</p>
            )}
          </div>

          {/* Dynamische velden */}
          {selectedType === 'car' && (
            <div className="mb-4">
              <label
                htmlFor="vehicleType"
                className="block text-gray-700 font-bold mb-2"
              >
                Type voertuig
              </label>
              <input
                type="text"
                id="vehicleType"
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleInputChange}
                className={`block w-full bg-white border ${
                  errors.vehicleType ? 'border-red-500' : 'border-gray-300'
                } rounded py-2 px-3 leading-tight focus:outline-none focus:border-primary`}
              />
              {errors.vehicleType && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.vehicleType}
                </p>
              )}
            </div>
          )}

          {selectedType === 'carpet' && (
            <>
              <div className="mb-4">
                <label
                  htmlFor="carpetWidth"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Breedte (in meters)
                </label>
                <input
                  type="text"
                  id="carpetWidth"
                  name="carpetWidth"
                  value={formData.carpetWidth}
                  onChange={handleInputChange}
                  className={`block w-full bg-white border ${
                    errors.carpetWidth ? 'border-red-500' : 'border-gray-300'
                  } rounded py-2 px-3 leading-tight focus:outline-none focus:border-primary`}
                />
                {errors.carpetWidth && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.carpetWidth}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="carpetLength"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Lengte (in meters)
                </label>
                <input
                  type="text"
                  id="carpetLength"
                  name="carpetLength"
                  value={formData.carpetLength}
                  onChange={handleInputChange}
                  className={`block w-full bg-white border ${
                    errors.carpetLength ? 'border-red-500' : 'border-gray-300'
                  } rounded py-2 px-3 leading-tight focus:outline-none focus:border-primary`}
                />
                {errors.carpetLength && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.carpetLength}
                  </p>
                )}
              </div>
            </>
          )}

          {selectedType === 'other' && (
            <div className="mb-4">
              <label
                htmlFor="otherDetails"
                className="block text-gray-700 font-bold mb-2"
              >
                Andere Details
              </label>
              <textarea
                id="otherDetails"
                name="otherDetails"
                value={formData.otherDetails}
                onChange={handleInputChange}
                className={`block w-full bg-white border ${
                  errors.otherDetails ? 'border-red-500' : 'border-gray-300'
                } rounded py-2 px-3 leading-tight focus:outline-none focus:border-primary`}
              ></textarea>
              {errors.otherDetails && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.otherDetails}
                </p>
              )}
            </div>
          )}

          {/* Contactkeuze */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Hoe wilt u gecontacteerd worden?
            </label>
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                value="phoneNumber"
                checked={contactChoice.includes('phoneNumber')}
                onChange={handleContactChange}
                className="mr-2"
              />
              <label>Telefoon</label>
            </div>
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                value="email"
                checked={contactChoice.includes('email')}
                onChange={handleContactChange}
                className="mr-2"
              />
              <label>Email</label>
            </div>
            {errors.contactChoice && (
              <p className="text-red-500 text-sm mt-1">
                {errors.contactChoice}
              </p>
            )}
          </div>

          {/* Telefoonnummer */}
          {contactChoice.includes('phoneNumber') && (
            <div className="mb-4">
              <label
                htmlFor="phoneNumber"
                className="block text-gray-700 font-bold mb-2"
              >
                Telefoonnummer
              </label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className={`block w-full bg-white border ${
                  errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                } rounded py-2 px-3 leading-tight focus:outline-none focus:border-primary`}
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phoneNumber}
                </p>
              )}
            </div>
          )}

          {/* Email */}
          {contactChoice.includes('email') && (
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-bold mb-2"
              >
                E-mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`block w-full bg-white border ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } rounded py-2 px-3 leading-tight focus:outline-none focus:border-primary`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
          )}

          {/* Afspraakdatum */}
          <div className="mb-4">
            <label
              htmlFor="appointmentDate"
              className="block text-gray-700 font-bold mb-2"
            >
              Afspraakdatum
            </label>
            <input
              type="date"
              id="appointmentDate"
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleInputChange}
              className={`block w-full bg-white border ${
                errors.appointmentDate ? 'border-red-500' : 'border-gray-300'
              } rounded py-2 px-3 leading-tight focus:outline-none focus:border-primary`}
            />
            {errors.appointmentDate && (
              <p className="text-red-500 text-sm mt-1">
                {errors.appointmentDate}
              </p>
            )}
          </div>

          {/* Message */}
          {isSubmitted ? (
            <p className="text-green-500 font-semibold text-lg">
              Uw formulier is succesvol verzonden!
            </p>
          ) : (
            <div className="mb-6">
              <button
                type="submit"
                className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Verstuur
              </button>
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

export default Pricing;
