// Mobile nav toggle
document.getElementById('menu-btn').addEventListener('click', () => {
  document.getElementById('mobile-menu').classList.toggle('hidden');
});

// Close mobile menu on link click
document.querySelectorAll('#mobile-menu a').forEach(a => {
  a.addEventListener('click', () => document.getElementById('mobile-menu').classList.add('hidden'));
});

// Active nav highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a[href^="#"]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === `#${current}`) a.classList.add('active');
  });
}, { passive: true });

// Projects data
const projects = [
  {
    title: 'Secure Multi-Subscription Azure Landing Zone',
    tags: ['Azure', 'Hub & Spoke', 'Azure Firewall', 'ExpressRoute', 'Sentinel'],
    color: '#34d399',
    content: `Designed and provisioned a governance-driven Azure Landing Zone following the Cloud Adoption Framework hub-and-spoke model for a UAE financial institution.
      <ul>
        <li>Dedicated subscriptions: Management (Sentinel, RBAC, Policy, Network Watcher), Identity (AAD, SSO, Conditional Access), Connectivity Hub, Non-Prod, and Prod</li>
        <li>Azure Firewall Premium in the hub with IDPS, FQDN filtering, and UDRs forcing all spoke traffic through centralized inspection</li>
        <li>ExpressRoute Gateway for private high-bandwidth connectivity to on-premise data centers</li>
        <li>App Gateway with WAF as single public ingress, forwarding to internal APIM; centralized Private DNS zones across all spokes</li>
        <li>Spoke workloads: AKS, dual APIM, CosmosDB, PostgreSQL, MySQL, Redis, Event Hub, Key Vault, AI Search, Document Intelligence — all via Terraform</li>
      </ul>`
  },
  {
    title: 'External & Internal Azure API Management',
    tags: ['Azure APIM', 'App Gateway', 'WAF', 'Private DNS', 'Terraform'],
    color: '#22d3ee',
    content: `Deployed two APIM instances within spoke VNets — one externally accessible, one internal-only.
      <ul>
        <li>External APIM: internal mode in spoke, fronted by App Gateway with WAF in the Connectivity Hub — handles auth and rate limiting for external consumers</li>
        <li>Internal APIM: accessible only to AKS workloads and internal services — no public exposure</li>
        <li>Private DNS zones configured so internal services resolve APIM without leaving the VNet</li>
        <li>Both instances provisioned via Terraform including products, subscriptions, APIs, and backend definitions</li>
      </ul>`
  },
  {
    title: 'CI/CD Migration: Azure DevOps → AWS Managed Services',
    tags: ['CodePipeline', 'CodeBuild', 'Lambda', 'EventBridge', 'SNS'],
    color: '#818cf8',
    content: `Migrated 30+ microservices CI/CD pipelines from on-premise Azure DevOps to fully AWS-managed services.
      <ul>
        <li>CodeCommit + CodeBuild + CodePipeline replaced on-premise pipelines; trunk-based branching strategy adopted</li>
        <li>Lambda (Python) + EventBridge for event-driven deployment automation</li>
        <li>SNS configured for automatic stakeholder email notifications on key pipeline events</li>
      </ul>`
  },
  {
    title: 'GitOps Pipelines for Azure AKS (40+ Microservices)',
    tags: ['GitHub Actions', 'GitOps', 'AKS', 'DevSecOps', 'ArgoCD'],
    color: '#c084fc',
    content: `Designed GitOps workflows for 40+ microservices on Azure AKS with automated multi-stage promotion.
      <ul>
        <li>Automated DEV → UAT → PROD promotion with PR creation at each stage and manual approval gates</li>
        <li>App-repo / GitOps-repo separation: image tags committed to GitOps repo to trigger environment deploys</li>
        <li>DevSecOps embedded: SonarQube, Checkmarx SAST/SCA/DAST, Trivy image scanning, cosign image signing at every stage</li>
        <li>GitHub environment protection rules with required approvals for UAT and PROD</li>
      </ul>`
  },
  {
    title: 'Terraform CI/CD for Azure Infrastructure',
    tags: ['Terraform', 'GitHub Actions', 'Azure', 'Key Vault', 'Remote State'],
    color: '#2dd4bf',
    content: `Built Terraform CI/CD pipelines on GitHub Actions for all Azure infrastructure provisioning.
      <ul>
        <li>Plan/apply split: plan runs on PRs for review; apply executes only on merge to main</li>
        <li>Remote state in Azure Storage Account with state locking to prevent concurrent modifications</li>
        <li>Separate tfvars per environment; secrets fetched at runtime from Azure Key Vault via Azure CLI</li>
        <li>Provisions: Spoke VNETs, AKS, DNS Zones, PostgreSQL, Document Intelligence, Firewalls, API Management</li>
      </ul>`
  },
  {
    title: 'DevSecOps: SAST, SCA, DAST & Image Scanning',
    tags: ['Checkmarx', 'Trivy', 'cosign', 'SonarQube', 'DevSecOps'],
    color: '#e879f9',
    content: `Embedded end-to-end DevSecOps practices across all CI/CD pipelines.
      <ul>
        <li>Checkmarx SAST and SCA for static application and dependency vulnerability scanning</li>
        <li>Checkmarx DAST for API security scanning within the pipeline — detects runtime vulnerabilities before deployment</li>
        <li>Trivy for Docker image vulnerability scanning on every build; cosign for image signing and verification before Kubernetes deployment</li>
        <li>SonarQube quality gates enforced — failed gates block deployment</li>
      </ul>`
  },
  {
    title: 'End-to-End TLS with Internal & Intermediate CAs',
    tags: ['TLS', 'PKI', 'Internal CA', 'NGINX Ingress', 'AKS'],
    color: '#fb923c',
    content: `Enforced full TLS encryption across 40+ microservices from APIM through to AKS backends.
      <ul>
        <li>Leveraged existing Internal and Intermediate CA hierarchy to issue and manage certificates at scale</li>
        <li>Full TLS chain: Azure API Management → NGINX Ingress Controller → backend services on AKS</li>
        <li>Centralized certificate lifecycle management — no plaintext traffic at any hop in the request path</li>
      </ul>`
  },
  {
    title: 'AI & Azure Document Intelligence Subscription',
    tags: ['Azure Document Intelligence', 'AKS', 'CosmosDB', 'PostgreSQL', 'Terraform'],
    color: '#a78bfa',
    content: `Provisioned a dedicated Azure subscription for AI document extraction workloads, fully automated via Terraform.
      <ul>
        <li>AI Document Extraction Service on AKS: consumes documents from Blob Storage, processes via Azure Document Intelligence, stores results in PostgreSQL and CosmosDB</li>
        <li>Azure AI Search for semantic search; APIM as unified API gateway for all AI capabilities</li>
        <li>All PaaS services (Key Vault, PostgreSQL, CosmosDB, Storage) exposed only via private endpoints</li>
        <li>Managed identities for pod-level access — no credentials embedded anywhere; federated credentials for keyless GitHub Actions → Azure auth</li>
      </ul>`
  },
  {
    title: 'Secure & Robust Infrastructure for Banking Website',
    tags: ['OCI', 'Kubernetes', 'Hub & Spoke VCN', 'NGFW', 'WAF', 'MSSQL'],
    color: '#f59e0b',
    content: `Engineered secure, highly available banking infrastructure on Oracle Cloud Infrastructure.
      <ul>
        <li>Hub & Spoke model VCN with Next-Generation Firewall and Security/Network Security Groups for network isolation</li>
        <li>Network Load Balancer + Application Load Balancer ensuring high availability; regional WAF for attack protection</li>
        <li>Kubernetes clusters on OCI for scalable container orchestration; Service Gateway for private inter-service communication</li>
        <li>Self-hosted MSSQL with RPO 15 min / RTO 20–30 min and comprehensive backup strategy</li>
        <li>OCI SMTP Service for secure transactional email delivery</li>
      </ul>`
  },
  {
    title: 'OAuth2 Authentication for Internal Services',
    tags: ['OAuth2', 'Keycloak', 'oauth2-proxy', 'NGINX Ingress', 'Kubernetes'],
    color: '#22d3ee',
    content: `Secured internal services (Grafana, etc.) via OAuth2 SSO using oauth2-proxy + Keycloak as Identity Provider.
      <ul>
        <li>Deployed bitnami/oauth2-proxy as reverse proxy authenticating against Keycloak IdP</li>
        <li>Integrated with NGINX Ingress for transparent authentication enforcement at the ingress layer</li>
        <li>Enabled Single Sign-On across internal Kubernetes services without sharing sensitive credentials</li>
        <li>cert-manager handling TLS certificate lifecycle for all secured endpoints</li>
      </ul>`
  },
  {
    title: 'Automatic Certificate Management Using Let\'s Encrypt',
    tags: ['cert-manager', 'Let\'s Encrypt', 'NGINX Ingress', 'Kubernetes', 'TLS'],
    color: '#818cf8',
    content: `Automated TLS certificate lifecycle for all Kubernetes services using cert-manager + Let's Encrypt.
      <ul>
        <li>cert-manager integrated with NGINX Ingress for automatic certificate issuance and assignment to ingress objects</li>
        <li>Achieved zero-downtime certificate renewals, preserving uninterrupted HTTPS for end-users</li>
        <li>Eliminated manual certificate management overhead and human-error risk across all services</li>
        <li>Enforced HTTPS consistently across all endpoints, maintaining a strong security posture</li>
      </ul>`
  },
  {
    title: 'Monitoring & Logging with kube-prometheus and Loki',
    tags: ['Prometheus', 'Grafana', 'Loki', 'Alertmanager', 'Kubernetes'],
    color: '#2dd4bf',
    content: `Deployed unified monitoring and logging stack for the Kubernetes environment.
      <ul>
        <li>prometheus-operator/kube-prometheus for cluster-wide metrics and Alertmanager for alert orchestration</li>
        <li>Grafana dashboards for interactive visualization of metrics and real-time operational insights</li>
        <li>bitnami/grafana-loki for centralized log aggregation from all services, integrated with Grafana</li>
        <li>NGINX Ingress + cert-manager ensuring secure, encrypted access to all observability tooling</li>
      </ul>`
  },
  {
    title: 'Self-Hosted GitHub Runners on Mac Studio',
    tags: ['GitHub Actions', 'ARC', 'Kubernetes', 'macOS', 'CI/CD'],
    color: '#c084fc',
    content: `Reduced iOS build time by <strong>75%</strong> (60 min → 15 min) and cut GitHub Actions minutes to 0.
      <ul>
        <li>Deployed self-hosted macOS runners on Mac Studios, replacing shared GitHub-hosted runners</li>
        <li>Actions Runner Controller (ARC) on Kubernetes to auto-scale runner pods for parallel builds</li>
        <li>Custom Docker images with pre-cached Ruby/Node libraries for faster subsequent builds</li>
        <li>Dedicated resources eliminated queue times and enabled concurrent iOS builds</li>
      </ul>`
  },
  {
    title: 'Security Integration in CI/CD Using Trivy',
    tags: ['Trivy', 'GitHub Actions', 'Docker', 'Vulnerability Scanning', 'CI/CD'],
    color: '#fb923c',
    content: `Integrated Aqua Security's Trivy into GitHub Actions CI/CD pipelines for automated security scanning.
      <ul>
        <li>Every build scans both repository code and Docker images for known vulnerabilities</li>
        <li>Proactive vulnerability detection before deployment, reducing production security risk</li>
        <li>Developers stay focused on features; security gates run automatically on every commit</li>
        <li>Continuous security assurance across all container images in the registry</li>
      </ul>`
  },
  {
    title: 'API Caching at AWS CloudFront',
    tags: ['AWS', 'CloudFront', 'CDN', 'Performance'],
    color: '#22d3ee',
    content: `Reduced API response time by <strong>75%</strong> (105ms → 25ms) by caching GET APIs at AWS CloudFront.
      <ul>
        <li>Created dynamic origins with custom caching and custom CORS policies</li>
        <li>Achieved single-digit millisecond latency for select GET endpoints</li>
      </ul>`
  },
  {
    title: 'Re-Architecting Backend APIs with AWS API Gateway',
    tags: ['AWS', 'API Gateway', 'WAF', 'EKS'],
    color: '#818cf8',
    content: `Improved security and performance of all backend APIs using Edge Optimized AWS REST API Gateway.
      <ul>
        <li>Applied AWS WAF at API Gateway for enhanced protection</li>
        <li>Used API throttling, API keys, and custom domain names</li>
        <li>Other AWS services: Network Load Balancer, EKS, VPC Links</li>
      </ul>`
  },
  {
    title: 'Multi-Cloud Architecture for China Traffic',
    tags: ['Multi-Cloud', 'Alibaba', 'Huawei', 'Zenlayer'],
    color: '#c084fc',
    content: `Reduced avg website load time in China by <strong>80%</strong> (2500ms → 500ms) across 3 phases, dropping cost from $3,500 → $70/mo (<strong>98% reduction</strong>).
      <ul>
        <li>Phase 1: Alibaba Global Accelerator + geolocation records (~$3,500/mo)</li>
        <li>Phase 2: Huawei Cloud Connect, SNAT/DNAT, NLB + geolocation records (~$1,500/mo)</li>
        <li>Phase 3: Zenlayer Global Accelerator + geolocation records (~$100/mo)</li>
      </ul>`
  },
  {
    title: 'Migrating Self-Hosted Services to AWS Managed',
    tags: ['AWS RDS', 'MongoDB Atlas', 'EKS'],
    color: '#2dd4bf',
    content: `<ul>
        <li>MySQL → AWS RDS MySQL</li>
        <li>MongoDB → MongoDB Atlas</li>
        <li>Elasticsearch → AWS Elasticsearch</li>
        <li>Self-managed Kubernetes (kops) → EKS</li>
      </ul>`
  },
  {
    title: 'Monitoring & Logging with ELK Stack',
    tags: ['ELK', 'Prometheus', 'Grafana', 'Ansible'],
    color: '#34d399',
    content: `Full observability setup from scratch across 50+ servers in 3 environments.
      <ul>
        <li>ELK stack deployed via docker-compose + Ansible playbooks on individual instances</li>
        <li>Journalbeat for Kubernetes logs; Metricbeat for K8s, instances, MongoDB, MySQL, NATS</li>
        <li>Dashboards: Kubernetes, System, Host, MongoDB, MySQL, NATS, Docker monitoring</li>
        <li>Alerting via Prometheus + Alertmanager + Blackbox Exporter → Slack</li>
      </ul>`
  },
  {
    title: 'Self-Managed Kubernetes with poseidon/typhoon',
    tags: ['Kubernetes', 'Terraform', 'AWS', 'Lambda'],
    color: '#22d3ee',
    content: `Built a self-healing Kubernetes cluster using AWS + Terraform + poseidon/typhoon.
      <ul>
        <li>Used reserved and spot instances to optimize cost</li>
        <li>Self-healing: spot termination triggers Lambda → Jenkins webhook → Ansible drains the node</li>
        <li>Generated K8s manifests programmatically using PHP</li>
      </ul>`
  },
  {
    title: 'Automated Daily Releases Pipeline',
    tags: ['Python', 'Jenkins', 'Ansible', 'Slack'],
    color: '#818cf8',
    content: `Fully automated release pipeline covering 50+ repositories.
      <ul>
        <li>2,000+ line Python script triggered via Ansible task through Jenkins</li>
        <li>Automated changelog email dispatched to stakeholders after every release</li>
        <li>Live Slack notifications with real-time build and deployment status updates</li>
      </ul>`
  },
  {
    title: 'Infrastructure Provisioning with Terraform & Ansible',
    tags: ['Terraform', 'Ansible', 'AWS'],
    color: '#c084fc',
    content: `<ul>
        <li>3-environment setup (Prod, Staging, Dev) each with VPCs, EC2, Route53, Security Groups, Bastion Hosts, NAT Gateways</li>
        <li>Planned and executed regular upgrades of self-managed services: MongoDB, MySQL, NATS</li>
      </ul>`
  },
  {
    title: 'PCI-DSS Compliance',
    tags: ['Security', 'AWS KMS', 'PCI-DSS', 'VAPT'],
    color: '#fbbf24',
    content: `Achieved PCI-DSS compliance by closing ~70 vulnerabilities across ASV, Network VAPT, and Web Application Penetration Testing.
      <ul>
        <li>Used AWS KMS to encrypt cardholder data before persisting to the database</li>
        <li>Provided complete documentation and closed all highlighted security gaps</li>
      </ul>`
  },
];

const list = document.getElementById('projects-list');
projects.forEach((p, i) => {
  const el = document.createElement('div');
  el.style.cssText = 'background:#07091a;border:1px solid rgba(255,255,255,0.06);border-radius:14px;overflow:hidden;transition:border-color 0.2s;';

  const tagsHtml = p.tags.map(t =>
    `<span style="padding:2px 8px;border-radius:6px;background:${p.color}15;color:${p.color};font-size:0.7rem;font-weight:600;">${t}</span>`
  ).join('');

  el.innerHTML = `
    <button onclick="toggleProject(${i}, this)" style="width:100%;display:flex;align-items:center;justify-content:space-between;gap:16px;padding:18px 20px;text-align:left;cursor:pointer;background:none;border:none;color:inherit;">
      <div style="display:flex;align-items:center;gap:14px;">
        <div style="width:32px;height:32px;border-radius:9px;background:${p.color}15;border:1px solid ${p.color}35;display:flex;align-items:center;justify-content:center;color:${p.color};font-size:0.7rem;font-weight:800;flex-shrink:0;">${String(projects.length - i).padStart(2,'0')}</div>
        <div>
          <div style="color:#e2e8f0;font-weight:600;font-size:0.9rem;">${p.title}</div>
          <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:6px;">${tagsHtml}</div>
        </div>
      </div>
      <i class="fas fa-chevron-down" style="color:#475569;flex-shrink:0;transition:transform 0.25s ease;font-size:0.8rem;"></i>
    </button>
    <div style="padding:0 20px 18px 20px;">
      <div style="padding-top:14px;border-top:1px solid rgba(255,255,255,0.06);color:#94a3b8;font-size:0.875rem;line-height:1.7;" class="project-content">${p.content}</div>
    </div>
  `;

  el.addEventListener('mouseenter', () => el.style.borderColor = `${p.color}30`);
  el.addEventListener('mouseleave', () => { if (!el.dataset.open) el.style.borderColor = 'rgba(255,255,255,0.06)'; });

  list.appendChild(el);
  el.dataset.open = '1';
  el.querySelector('i').style.transform = 'rotate(180deg)';
  el.style.borderColor = `${p.color}30`;
});

function toggleProject(i, btn) {
  const card = btn.closest('div[style*="overflow:hidden"]') || btn.parentElement;
  const content = btn.nextElementSibling;
  const icon = btn.querySelector('i');
  const isOpen = content.style.display !== 'none';
  content.style.display = isOpen ? 'none' : 'block';
  icon.style.transform = isOpen ? '' : 'rotate(180deg)';
  card.dataset.open = isOpen ? '' : '1';
}

// Scroll-driven timeline fill
(function() {
  const container = document.getElementById('timeline-container');
  const fill = document.getElementById('timeline-fill');
  if (!container || !fill) return;

  function update() {
    const rect = container.getBoundingClientRect();
    const totalHeight = container.offsetHeight - 48;
    const scrolled = -rect.top + window.innerHeight * 0.55;
    const progress = Math.max(0, Math.min(1, scrolled / totalHeight));
    fill.style.height = (progress * totalHeight) + 'px';
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
})();
