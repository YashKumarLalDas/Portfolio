#!/usr/bin/env python3
import re

with open('app/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the old paragraph with new one
old_para = "I'm a results-driven Cloud & DevOps Engineer with strong expertise in AWS infrastructure, CI/CD pipelines, infrastructure as code (IaC), cloud security, and automation. At Tata Consultancy Services (TCS), I architected scalable AWS environments using EC2, VPC, S3, IAM, CloudWatch, and Terraform, built CI/CD pipelines with Jenkins and GitHub Actions, and automated system monitoring, backups, and deployments to improve uptime and reliability. I've developed hands-on projects such as VPC 2-Tier Architecture, S3 Static Website Hosting, EC2 RDP Automation, and ProjectFlow—an AI-driven serverless solution using AWS Lambda and API Gateway. Currently, at the University of North Texas – Library Services, I serve as an Academic Assistant leading cloud-style automation and system optimization, developing Python-based scripts, managing data pipelines, and improving process efficiency by over 40%. I specialize in infrastructure automation, performance monitoring, and deployment optimization, bridging operations and development through secure, efficient, and scalable cloud architectures."

new_content = '''I'm a Software Engineer with 3+ years of experience building and supporting production-grade systems using Python, cloud infrastructure, and DevOps practices.
            </p>
            <ul className="space-y-3 mb-4 text-gray-300 leading-relaxed">
              <li className="flex gap-3">
                <span className="text-cyan-400 flex-shrink-0 mt-0.5">•</span>
                <span>Supported 24×7 production systems at Tata Consultancy Services for a global aviation and maritime connectivity client, monitoring international flights and vessels, triaging alerts, analyzing logs, and driving incident response and RCA in distributed Linux environments.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-400 flex-shrink-0 mt-0.5">•</span>
                <span>Built Python-based automation and data workflows at UNT Libraries, improving reporting accuracy and operational efficiency.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-400 flex-shrink-0 mt-0.5">•</span>
                <span>Developed hands-on engineering projects on GitHub, including AWS serverless backends, Kubernetes observability platforms, secure cloud architectures, and infrastructure automation, focused on scalability and reliability.</span>
              </li>
            </ul>
            <p className="text-gray-300 leading-relaxed">
              I'm seeking software engineering roles that combine backend development, cloud systems, and automation.'''

if old_para in content:
    content = content.replace(old_para, new_content)
    with open('app/page.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Successfully replaced About section")
else:
    print("Old paragraph not found")
