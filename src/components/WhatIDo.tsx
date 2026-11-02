import { useEffect, useRef } from "react";
import "./styles/WhatIDo.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const WhatIDo = () => {
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);
  const setRef = (el: HTMLDivElement | null, index: number) => {
    containerRef.current[index] = el;
  };
  useEffect(() => {
    if (ScrollTrigger.isTouch) {
      containerRef.current.forEach((container) => {
        if (container) {
          container.classList.remove("what-noTouch");
          container.addEventListener("click", () => handleClick(container));
        }
      });
    }
    return () => {
      containerRef.current.forEach((container) => {
        if (container) {
          container.removeEventListener("click", () => handleClick(container));
        }
      });
    };
  }, []);
  return (
    <div className="whatIDO">
      <div className="what-box">
        <h2 className="title">
          W<span className="hat-h2">HAT</span>
          <div>
            I<span className="do-h2"> DO</span>
          </div>
        </h2>
      </div>
      <div className="what-box">
        <div className="what-box-in">
          <div className="what-border2">
            <svg width="100%">
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
              <line
                x1="100%"
                y1="0"
                x2="100%"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
            </svg>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 0)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>

            <div className="what-content-in">
              <h3>CLOUD & DEVOPS</h3>
              <h4>Description</h4>
              <p>
                Architecting scalable, resilient AWS cloud infrastructure and
                automating deployment workflows. Proficient in containerization,
                orchestration, CI/CD pipelines, and infrastructure automation.
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">AWS EC2 / Lambda</div>
                <div className="what-tags">VPC & Networking</div>
                <div className="what-tags">Docker & Kubernetes</div>
                <div className="what-tags">CI/CD Pipelines</div>
                <div className="what-tags">Jenkins & CodePipeline</div>
                <div className="what-tags">Python for DevOps</div>
                <div className="what-tags">Bash Scripting</div>
                <div className="what-tags">Linux (Ubuntu/CentOS)</div>
                <div className="what-tags">Nginx Web Server</div>
                <div className="what-tags">S3, EBS & EFS</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 1)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <h3>CYBER SECURITY</h3>
              <h4>Description</h4>
              <p>
                Master's in Cyber Security with practical expertise in cloud
                governance, IAM least-privilege access, auditing with CloudTrail,
                monitoring with CloudWatch, and Bedrock AI/ML integration.
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">IAM & MFA Security</div>
                <div className="what-tags">VPC, NACL & Security Groups</div>
                <div className="what-tags">CloudWatch & CloudTrail</div>
                <div className="what-tags">Ethical Hacking (CEH)</div>
                <div className="what-tags">Amazon Bedrock (GenAI)</div>
                <div className="what-tags">RDS, Aurora & DynamoDB</div>
                <div className="what-tags">Route 53 & CloudFront</div>
                <div className="what-tags">DRDO BRAHMA Project</div>
                <div className="what-tags">System Administration</div>
                <div className="what-tags">SNS, SES & SQS</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;

function handleClick(container: HTMLDivElement) {
  container.classList.toggle("what-content-active");
  container.classList.remove("what-sibling");
  if (container.parentElement) {
    const siblings = Array.from(container.parentElement.children);

    siblings.forEach((sibling) => {
      if (sibling !== container) {
        sibling.classList.remove("what-content-active");
        sibling.classList.toggle("what-sibling");
      }
    });
  }
}
