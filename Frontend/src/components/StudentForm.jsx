import React, { useState, useEffect } from 'react';

const StudentForm = ({ currentStudent, onSubmit, onCancel, isLoading }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    course: '',
    email: '',
    city: '',
  });

  const [errors, setErrors] = useState({});

  // When currentStudent changes (e.g. user clicks Edit), populate the form fields
  useEffect(() => {
    if (currentStudent) {
      setFormData({
        name: currentStudent.name || '',
        age: currentStudent.age || '',
        course: currentStudent.course || '',
        email: currentStudent.email || '',
        city: currentStudent.city || '',
      });
    } else {
      setFormData({
        name: '',
        age: '',
        course: '',
        email: '',
        city: '',
      });
    }
    setErrors({});
  }, [currentStudent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else if (isNaN(formData.age) || Number(formData.age) <= 0) {
      newErrors.age = 'Please enter a valid age';
    }
    if (!formData.course.trim()) newErrors.course = 'Course is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.city.trim()) newErrors.city = 'City is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Convert age to number
    const payload = {
      ...formData,
      age: Number(formData.age),
    };

    onSubmit(payload);
  };

  const isEditMode = Boolean(currentStudent);

  return (
    <div className="card form-card">
      <div className="card-header">
        <h2>{isEditMode ? 'Edit Student Details' : 'Add New Student'}</h2>
        {isEditMode && (
          <span className="badge badge-warning">Edit Mode</span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="student-form" noValidate>
        <div className="form-grid">
          {/* Name Field */}
          <div className="form-group">
            <label htmlFor="name">
              Full Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. John Doe"
              className={errors.name ? 'input-error' : ''}
              disabled={isLoading}
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          {/* Age Field */}
          <div className="form-group">
            <label htmlFor="age">
              Age <span className="required">*</span>
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="e.g. 21"
              min="1"
              max="120"
              className={errors.age ? 'input-error' : ''}
              disabled={isLoading}
            />
            {errors.age && <span className="error-text">{errors.age}</span>}
          </div>

          {/* Course Field */}
          <div className="form-group">
            <label htmlFor="course">
              Course <span className="required">*</span>
            </label>
            <input
              type="text"
              id="course"
              name="course"
              value={formData.course}
              onChange={handleChange}
              placeholder="e.g. Computer Science"
              className={errors.course ? 'input-error' : ''}
              disabled={isLoading}
            />
            {errors.course && <span className="error-text">{errors.course}</span>}
          </div>

          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email">
              Email Address <span className="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. john@example.com"
              className={errors.email ? 'input-error' : ''}
              disabled={isLoading}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          {/* City Field */}
          <div className="form-group">
            <label htmlFor="city">
              City <span className="required">*</span>
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="e.g. New York"
              className={errors.city ? 'input-error' : ''}
              disabled={isLoading}
            />
            {errors.city && <span className="error-text">{errors.city}</span>}
          </div>
        </div>

        {/* Form Buttons */}
        <div className="form-actions">
          <button
            type="submit"
            className={isEditMode ? 'btn btn-primary' : 'btn btn-success'}
            disabled={isLoading}
          >
            {isLoading
              ? isEditMode
                ? 'Updating...'
                : 'Adding...'
              : isEditMode
              ? 'Update Student'
              : 'Add Student'}
          </button>

          {isEditMode && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
              disabled={isLoading}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default StudentForm;
