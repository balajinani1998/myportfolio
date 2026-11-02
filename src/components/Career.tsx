import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Customer Service Senior Executive</h4>
                <h5>Cathay Pacific Airlines - Hyderabad</h5>
              </div>
              <h3>2026</h3>
            </div>
            <p>
              Supervised front-line operations at Hyderabad airport, ensuring smooth
              passenger handling and on-time departures. Led cross-functional teams
              and managed irregular operations (IROPS) crisis resolution.
            </p>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Customer Service Professional</h4>
                <h5>Foundever (Verizon Business) - Hyderabad</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Handled enterprise communications for U.S.-based business customers.
              Created, tracked, and resolved technical and account service tickets
              while consistently meeting strict SLA timelines.
            </p>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Customer Service Specialist</h4>
                <h5>Cathay Pacific & Japan Airlines - London, UK</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Delivered passenger service and airport operations in fast-paced
              international London terminals. Guided team members and ensured
              operational and regulatory compliance.
            </p>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>System Administrator / IT Support</h4>
                <h5>Hyderabad Radio House - Hyderabad</h5>
              </div>
              <h3>2021</h3>
            </div>
            <p>
              Installed, configured, and maintained computer hardware, software,
              and network systems. Deployed firewall and antivirus security
              solutions and maintained technical documentation.
            </p>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>M.Sc. in Cyber Security</h4>
                <h5>University of Hertfordshire - UK</h5>
              </div>
              <h3>2023</h3>
            </div>
            <p>
              Master's in Cyber Security (Computer Science). Hands-on knowledge of
              30+ AWS services, Docker, Kubernetes, CI/CD pipelines, and Certified
              Ethical Hacker (CEH) principles.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
