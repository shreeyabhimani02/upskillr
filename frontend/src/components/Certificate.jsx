import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './Certificate.css';
import logo from '../assets/upskillr-logo.png';

const Certificate = ({
  userName,
  courseName,
  certificateId,
  issueDate,
  isPreview = false
    }) => {
  const certificateRef = useRef(null);

  const handleDownloadPDF = async () => {
    if (!certificateRef.current) return;

    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 3,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });

      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(`certificate-${userName.replace(/\s+/g, '-').toLowerCase()}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  return (
    <motion.div 
      className={`certificate-wrapper ${isPreview ? 'preview-mode' : ''}`}
      initial={isPreview ? {} : { opacity: 0, scale: 0.9 }}
      animate={isPreview ? {} : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div 
        ref={certificateRef}
        className="certificate-paper google-style"
      >
        {/* Top Header Row with Logo */}
        <div className="google-header-row">
          <div className="header-line"></div>
          <div className="google-brand-logo">
            <img src={logo} alt="Upskillr Logo" className="brand-img-google-style" />
          </div>
          <div className="header-line"></div>
        </div>

        {/* Certificate Content */}
        <div className="google-content">
          <h1 className="google-cert-title">{courseName} Certification</h1>
          
          <div className="google-recipient-section">
            <h2 className="google-recipient-name">{userName}</h2>
          </div>

          <p className="google-description">
            is hereby awarded this certificate of achievement for the successful 
            completion of the<br /><strong>{courseName}</strong> curriculum.
          </p>
        </div>

        <div className="google-footer">
          <div className="google-seal-placeholder">
            <div className="google-badge-outer">
              <div className="google-badge-inner">
                <span className="check-mark">✓</span>
                <span>CERTIFIED</span>
              </div>
            </div>
          </div>
          
          <div className="signature-section">
            <div className="signature-image">Alex Sterling</div>
            <div className="tutor-name">Alex Sterling</div>
            <div className="tutor-title">Lead Instructor, Upskillr</div>
          </div>
        </div>
            <div className="certificate-meta">
            <span><strong>Certificate ID:</strong> {certificateId}</span>
            <span><strong>Issued On:</strong> {issueDate}</span>
          </div>
      </div>
      
      {!isPreview && (
        <div className="cert-actions">
           <motion.button 
            className="download-btn-google"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownloadPDF}
          >
            Download PDF Certificate
          </motion.button>
        </div>
      )}
    </motion.div>
  );
};

export default Certificate;