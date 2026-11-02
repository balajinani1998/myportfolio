import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const projects = [
  {
    num: "01",
    name: "AWS High-Availability Architecture",
    category: "Cloud Infrastructure",
    tools: "VPC, EC2, ALB, Auto Scaling (ASG), Route 53, CloudFront, S3",
    image: "/images/placeholder.webp",
  },
  {
    num: "02",
    name: "Containerized CI/CD Pipeline",
    category: "DevOps & Automation",
    tools: "Docker, Kubernetes (K8s), AWS CodePipeline, Jenkins, GitHub",
    image: "/images/placeholder.webp",
  },
  {
    num: "03",
    name: "Serverless Event-Driven Workflows",
    category: "Cloud & Serverless",
    tools: "AWS Lambda, API Gateway, DynamoDB, RDS Aurora, S3 Triggers",
    image: "/images/placeholder.webp",
  },
  {
    num: "04",
    name: "Cloud Security & Governance",
    category: "Cyber Security & Auditing",
    tools: "AWS IAM (MFA/Roles), CloudTrail Auditing, CloudWatch, NACLs",
    image: "/images/placeholder.webp",
  },
  {
    num: "05",
    name: "AWS Bedrock GenAI & OCR Pipeline",
    category: "AI/ML Integration",
    tools: "Amazon Bedrock, Textract, Rekognition, Transcribe, Polly",
    image: "/images/placeholder.webp",
  },
  {
    num: "06",
    name: "DevOps Infrastructure Automation",
    category: "Scripting & Systems",
    tools: "Python for DevOps, Bash Shell Scripting, Nginx Proxy, Linux",
    image: "/images/placeholder.webp",
  },
];

const Work = () => {
  useGSAP(() => {
    let translateX: number = 0;

    function setTranslateX() {
      const box = document.getElementsByClassName("work-box");
      if (!box || box.length === 0) return 0;
      const workContainer = document.querySelector(".work-container");
      if (!workContainer) return 0;
      const rectLeft = workContainer.getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
      let padding: number =
        parseInt(window.getComputedStyle(box[0]).padding) / 2;
      return rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    translateX = setTranslateX();

    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: `+=${translateX}`,
        scrub: true,
        pin: true,
        id: "work",
      },
    });

    timeline.to(".work-flex", {
      x: -translateX,
      ease: "none",
    });

    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          Featured <span>Projects</span>
        </h2>
        <div className="work-flex">
          {projects.map((proj, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>{proj.num}</h3>
                  <div>
                    <h4>{proj.name}</h4>
                    <p>{proj.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{proj.tools}</p>
              </div>
              <WorkImage image={proj.image} alt={proj.name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
