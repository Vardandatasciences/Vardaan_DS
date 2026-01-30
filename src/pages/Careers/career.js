import React, { useState, useEffect } from 'react';
import './career.css';
import careerHero from '../../assets/Images/Careers/Career.jpg';
import careersBg from '../../assets/Images/Careers/Careers 1.avif';
import Footer from '../../components/Footer/Footer';
import { config } from '../../utils/config';

const Career = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    resume: null,
    dragActive: false
  });
  const [jobList, setJobList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [popup, setPopup] = useState({ open: false, message: '', type: 'success' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${config.API_URL}/api/job-listings`);
        const data = await res.json();
        if (data.success) {
          // Map backend fields to frontend fields (backend already filters for active jobs)
          const jobs = data.jobs.map(job => ({
            ...job,
            desc: job.description,
            tags: Array.isArray(job.tags)
              ? job.tags
              : typeof job.tags === 'string' && job.tags.includes(',')
                ? job.tags.split(',').map(t => t.trim())
                : job.tags ? [job.tags] : [],
          }));
          setJobList(jobs);
        } else {
          setError(data.message || 'Failed to fetch job listings');
        }
      } catch (err) {
        setError('Failed to fetch job listings');
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const openModal = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };
  const openResumeModal = () => {
    setSelectedJob(null);
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    setSelectedJob(null);
    setForm({ firstName: '', lastName: '', email: '', phone: '', resume: null, dragActive: false });
  };
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setPopup({ open: true, message: 'Submitting your application...', type: 'loading' });
    // Prepare form data for multipart/form-data
    const formData = new FormData();
    formData.append('firstName', form.firstName);
    formData.append('lastName', form.lastName);
    formData.append('email', form.email);
    formData.append('phone', form.phone);
    if (form.resume) formData.append('resume', form.resume);
    if (selectedJob && selectedJob.title) {
      formData.append('jobTitle', selectedJob.title);
    }
    try {
      const res = await fetch(`${config.API_URL}/api/job-application`, {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.success) {
        setPopup({ open: true, message: 'Application submitted successfully!', type: 'success' });
      } else {
        setPopup({ open: true, message: data.message || 'Failed to submit application', type: 'error' });
      }
    } catch (err) {
      setPopup({ open: true, message: 'Failed to submit application', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const closePopup = () => {
    if (popup.type === 'success') {
      closeModal();
    }
    setPopup({ open: false, message: '', type: 'success' });
  };

  return (
    <div className="careers-container">
      <div className="careers-hero" style={{ backgroundImage: `url(${careerHero})` }}>
        <div className="careers-hero-overlay">
          {/* <h1>Join Our Amazing Team</h1> */}
        </div>
      </div>
      {/* Find Your Perfect Role Section */}
      <div className="careers-intro-section">
        <h2 className="careers-intro-heading">Join Us</h2>
        <p className="careers-intro-text">
          Through a combination of in-house expertise and a robust partner ecosystem, we are dedicated to empowering organisations to enhance efficiency, build resilience, and stay ahead in a rapidly changing landscape.
        </p>
      </div>
      {/* Job Listings Section */}
      <div className="careers-job-listings bg-careers">
        {loading ? (
          <div className="careers-job-loading">Loading job listings...</div>
        ) : error ? (
          <div className="careers-job-error">{error}</div>
        ) : jobList.length === 0 ? (
          <div className="careers-job-empty">No job listings available at the moment.</div>
        ) : (
          jobList.map((job) => (
            <div className="careers-job-card" key={job.id}>
              <div className="careers-job-header">
                <span className={`careers-job-category ${job.category ? job.category.toLowerCase() : ''}`}>{job.category}</span>
                <span className="careers-job-type">{job.type}</span>
              </div>
              <div className="careers-job-title">{job.title}</div>
              <div className="careers-job-desc">{job.desc}</div>
              <div className="careers-job-meta">
                <span>{job.location}</span>
                <span>{job.salary}</span>
              </div>
              <div className="careers-job-tags">
                {job.tags && job.tags.map((tag, i) => (
                  <span key={i}>{tag}</span>
                ))}
              </div>
              <div className="careers-job-apply">
                <button className="careers-job-apply-btn" onClick={() => openModal(job)}>Apply Now</button>
              </div>
            </div>
          ))
        )}
      </div>
      {/* Don't see the right role section */}
      <div className="careers-resume-section">
        <h2 className="careers-resume-title">Don't see the right role?</h2>
        <div className="careers-resume-desc">We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future opportunities.</div>
        <button className="careers-resume-btn" onClick={openResumeModal}>Send Resume <span style={{marginLeft: 6}}>&#8594;</span></button>
      </div>
      {/* Modal Popup */}
      {showModal && (
        <div className="careers-modal-overlay" onClick={closeModal}>
          <div className="careers-modal" onClick={e => e.stopPropagation()}>
            <button className="careers-modal-close" onClick={closeModal}>&times;</button>
            <h2 className="careers-modal-title">{selectedJob ? `Apply for ${selectedJob.title}` : 'Send Your Resume'}</h2>
            <form className="careers-modal-form" onSubmit={handleSubmit}>
              <div className="careers-modal-form-row">
                <div className="careers-modal-form-group">
                  <label>First Name *</label>
                  <input name="firstName" type="text" value={form.firstName} onChange={handleChange} required placeholder="Enter your first name" />
                </div>
                <div className="careers-modal-form-group">
                  <label>Last Name *</label>
                  <input name="lastName" type="text" value={form.lastName} onChange={handleChange} required placeholder="Enter your last name" />
                </div>
              </div>
              <div className="careers-modal-form-row">
                <div className="careers-modal-form-group">
                  <label>Email Address *</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="Enter your email address" />
                </div>
                <div className="careers-modal-form-group">
                  <label>Phone Number *</label>
                  <input name="phone" type="tel" value={form.phone} onChange={handleChange} required placeholder="Enter your phone number" />
                </div>
              </div>
              {/* Resume Upload Field */}
              <label>Resume *</label>
              <div
                className={`careers-upload-dropzone${form.dragActive ? ' dragover' : ''}`}
                onClick={() => document.getElementById('resume-upload').click()}
                onDragOver={e => { e.preventDefault(); setForm(f => ({ ...f, dragActive: true })); }}
                onDragLeave={e => { e.preventDefault(); setForm(f => ({ ...f, dragActive: false })); }}
                onDrop={e => {
                  e.preventDefault();
                  setForm(f => ({ ...f, resume: e.dataTransfer.files[0], dragActive: false }));
                }}
              >
                <span className="careers-upload-icon">
                  <svg width="40" height="40" fill="none" viewBox="0 0 24 24">
                    <path d="M12 16V4m0 0l-4 4m4-4l4 4" stroke="#8ca0c9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <rect x="4" y="16" width="16" height="4" rx="2" fill="#f3f6fa"/>
                  </svg>
                </span>
                <span className="careers-upload-label">
                  Drop your resume here, or{' '}
                  <span
                    className="careers-upload-browse"
                    onClick={e => { e.stopPropagation(); document.getElementById('resume-upload').click(); }}
                  >browse</span>
                </span>
                <span className="careers-upload-note">PDF, DOC, or DOCX (max 5MB)</span>
                {form.resume && (
                  <div style={{marginTop: 8, color: '#3570f7', fontWeight: 500, fontSize: '1rem'}}>
                    {form.resume.name}
                  </div>
                )}
                <input
                  id="resume-upload"
                  name="resume"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  style={{ display: 'none' }}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="careers-modal-actions">
                <button type="button" className="careers-modal-cancel" onClick={closeModal}>Cancel</button>
                <button type="submit" className="careers-modal-submit">Submit Application</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {popup.open && (
        <div className="careers-popup-overlay" onClick={popup.type !== 'loading' ? closePopup : undefined}>
          <div className="careers-popup" onClick={e => e.stopPropagation()}>
            {popup.type === 'loading' ? (
              <>
                <div className="careers-popup-title loading">Submitting...</div>
                <div className="careers-popup-message">{popup.message}</div>
                <div className="careers-popup-spinner" />
              </>
            ) : (
              <>
                <div className={`careers-popup-title ${popup.type === 'success' ? 'success' : 'error'}`}>
                  {popup.type === 'success' ? 'Success' : 'Error'}
                </div>
                <div className="careers-popup-message">{popup.message}</div>
                <button className={`careers-popup-button ${popup.type === 'success' ? 'success' : 'error'}`} onClick={closePopup}>OK</button>
              </>
            )}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Career; 