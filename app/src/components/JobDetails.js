import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';
import '../styles/JobDetails.css';

const JobDetails = () => {
    const { jobId } = useParams();
    const [job, setJob] = useState(null);

    useEffect(() => {
        const fetchJob = async () => {
            const jobDoc = await getDoc(doc(firestore, 'jobs', jobId));
            if (jobDoc.exists()) {
                setJob(jobDoc.data());
            } else {
                console.log("No such document!");
            }
        };

        fetchJob();
    }, [jobId]);

    if (!job) {
        return <div>Loading...</div>;
    }

    // qualifications verisinin bir dizi olduğunu kontrol et
    const qualifications = Array.isArray(job.qualifications) ? job.qualifications : (job.qualifications || "").split(',').map(qual => qual.trim());

    return (
        <div className="job-details-container">
            <div className="job-header">
                <img src={job.companyLogo || "https://placehold.co/100"} alt="Company Logo" className="company-logo" />
                <div>
                    <h1 className="company-name">{job.companyName || "Company Name"}</h1>
                    <h2 className="job-name">{job.jobName || "Job Name"}</h2>
                </div>
                <button className="apply-button-header">Apply</button>
            </div>
            <div className="job-body">
                <div className="job-description">
                    <img src={job.jobPicture || "https://placehold.co/300x200"} alt="Job" className="job-picture" />
                    <h3>Job Description</h3>
                    <p>{job.jobDescription || "Job description details..."}</p>
                    <h3>About Company</h3>
                    <p>{job.aboutCompany || "About the company details..."}</p>
                </div>
                <div className="job-details">
                    <h3>Details</h3>
                    <hr />
                    <p><strong>Department</strong><br />{job.department || "Job Department"}</p>
                    <hr />
                    <p><strong>Job Type</strong><br />{job.jobType || "e.g. Intern"}</p>
                    <hr />
                    <p><strong>Release Date</strong><br />{job.applicationReleaseDate || "??-??-2024"}</p>
                    <hr />
                    <p><strong>Deadline Date</strong><br />{job.applicationDeadline || "??-??-2024"}</p>
                    <hr />
                    <p><strong>Salary</strong><br />{job.salary || "$"}</p>
                    <hr />
                    <p><strong>Location</strong><br />{job.location || "e.g. Locations"}</p>
                    <hr />
                    <p><strong>Required Qualifications</strong></p>
                    <div className="qualifications-container">
                        {qualifications.map((qual, index) => (
                            <span key={index} className="qualification-bubble">{qual}</span>
                        ))}
                    </div>
                    <button className="apply-button">Apply Now</button>
                </div>
            </div>
        </div>
    );
};

export default JobDetails;