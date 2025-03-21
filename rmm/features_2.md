# RMM Additional Assessment Categories

This file contains additional assessment categories for Remote Monitoring & Management (RMM) products that complement the core feature set in features.md.

## Company

| ID | Name | Description |
|----|------|-------------|
| last_updated_date | Date last verified or updated |
| parent | Parent | Parent Company |
| emp_size | Employee Size | Size of the company or division |
| founded | Founded | Year the company was founded |
| headquarters | Headquarters | Location of company headquarters |
| dev_headquarters | Headquarters | Location of main developer hubs |
| public_private | Public/Private | Whether the company is publicly traded or privately held or private with PE |
| acquisition | Acquisition | Details about any acquisitions |

## Product Maturity

| ID | Name | Description |
|----|------|-------------|
| version_history | Version History | Length of time the product has been on the market and major version releases |
| release_cadence | Release Cadence | Frequency of updates and new feature releases |
| roadmap_transparency | Roadmap Transparency | Visibility into future development plans |
| beta_program | Beta Program | Availability of beta testing program for new features |
| deprecation_policy | Deprecation Policy | Policy for deprecating and removing features |
| last_updated_date | Last Updated Date | Date when product information was last verified |

## Architecture

| ID | Name | Description |
|----|------|-------------|
| cloud | Cloud | Cloud-based deployment option |
> Cloud-based deployments are hosted by the vendor and typically require no infrastructure management.

| on_premises | On Premises | On-premises deployment option |
> On-premises deployments are installed on your own infrastructure and may require more maintenance.

| db_access | On Premises Database Access | Direct access to the database in on-premises deployments |
> Database access can be important for custom reporting and integration with other systems.

| cloud_db | Access to the Cloud DB | Direct access to a database in which the application is cloud-only |
| hybrid | Hybrid | Supports both cloud and on-premises deployment options |
| multi_tenant | Multi-Tenant Support | Ability to manage multiple clients/organizations within a single instance |
| white_label | White Label | Ability to rebrand the solution with your own branding |
| mobile_app | Mobile App | Dedicated mobile application for on-the-go access |
| api_access | API Access | Provides API for custom integrations |

## Core Features

| ID | Name | Description |
|----|------|-------------|
| patch_management | Patch Management | Ability to deploy and manage patches for operating systems and applications |
> Patch management is a critical security feature for maintaining up-to-date systems.
> Most RMM tools offer some form of patch management, but capabilities can vary significantly.

| remote_access | Remote Access | Ability to remotely access and control devices |
> Remote access allows technicians to troubleshoot and resolve issues without being physically present.

| monitoring | Monitoring | Ability to monitor device health and performance |
> Monitoring capabilities typically include CPU, memory, disk usage, and other system metrics.
> Some tools offer more advanced monitoring features like application-specific monitoring.

| run_scripts | Run Scripts/Automations | Ability to run scripts/automations on endpoints |
| self_service_portal | Self-Service Portal | Portal for end-users to request support or access resources |
| reporting | Reporting | Built-in reporting capabilities |
| automation | Automation | Ability to automate routine tasks and workflows |
| asset_management | Asset Management | Tracking and management of hardware and software assets |
| network_topology | Network Topology | Visual mapping of network infrastructure |
| documentation | Documentation | Built-in documentation capabilities |
| knowledge_base | Knowledge Base | Repository of troubleshooting and support information |


## User Experience / UI

| ID | Name | Description |
|----|------|-------------|
| ui_modern | Modern UI | Whether the interface uses modern design principles |
| ui_consistency | UI Consistency | Consistency of UI elements across the platform |
| dark_mode | Dark Mode | Support for dark mode interface |
| accessibility | Accessibility | Compliance with accessibility standards (WCAG) |
| customizable_dashboard | Customizable Dashboard | Ability to customize dashboard views |
| saved_views | Saved Views | Ability to save and share custom views |
| bulk_actions | Bulk Actions | Support for performing actions on multiple items at once |
| search_capabilities | Search Capabilities | Advanced search functionality across the platform |
| keyboard_shortcuts | Keyboard Shortcuts | Support for keyboard shortcuts |
| localization | Localization | Support for multiple languages and regional settings |

## Deployment & Onboarding

| ID | Name | Description |
|----|------|-------------|
| agent_deployment | Agent Deployment Methods | Methods available for deploying agents to endpoints |
| agent_size | Agent Size | Size and resource footprint of the agent |
| agent_impact | Agent Performance Impact | Impact of the agent on endpoint performance |
| silent_install | Silent Installation | Support for silent installation of agents |
| mass_deployment | Mass Deployment Tools | Tools for deploying to multiple endpoints at once |
| onboarding_wizard | Onboarding Wizard | Guided setup process for new deployments |
| migration_tools | Migration Tools | Tools for migrating from other RMM platforms |
| template_policies | Template Policies | Pre-configured policy templates for common scenarios |
| discovery_scan | Network Discovery | Ability to discover devices on the network |
| agent_removal | Agent Removal | Process for removing agents from endpoints from console/app |


## Scripting/Engine

| ID | Name | Description |
|----|------|-------------|
| powershell | PowerShell Support | Support for PowerShell scripting |
| bash | Bash/Shell Support | Support for Bash/Shell scripting |
| python | Python Support | Support for Python scripting |
| javascript | JavaScript Support | Support for scripting in JavaScript |
| script_library | Script Library | Pre-built script library available |
| script_scheduling | Script Scheduling | Ability to schedule scripts to run at specific times |
| custom_scripts | Custom Scripts | Ability to create and run custom scripts |
| script_templates | Script Templates | Pre-built templates for common scripting tasks |
| external_support | Support for Scripts Hosted Externally | The ability to access/pull/run scripts from a hosted repository outside of the application (IE Github) |


## Workflow/RPA Capabilities

| ID | Name | Description |
|----|------|-------------|
| automation_engine | Automation Engine | Does the application support a workflow/rpa system interally |
| conditional_logic | Conditional Logic | Support for complex conditional logic in automations |
| trigger_types | Automation Triggers | Types of events that can trigger automations |
| action_types | Automation Actions | Types of actions that can be performed by automations |
| scheduling_options | Scheduling Options | Options for scheduling automated tasks |
| approval_workflows | Approval Workflows | Support for approval workflows in automations |
| automation_templates | Automation Templates | Pre-built automation templates |
| automation_logging | Automation Logging | Logging and auditing of automation execution |
| automation_testing | Automation Testing | Tools for testing automations before deployment |
| automation_marketplace | Automation Marketplace | Marketplace for sharing and downloading automations |

## Remote Support Tools

| ID | Name | Description |
|----|------|-------------|
| remote_desktop | Remote Desktop | Built-in remote desktop capabilities |
| remote_terminal | Remote Terminal/Command Line | Remote terminal or command line access |
| remote_file_manager | Remote File Manager | Remote file management capabilities |
| remote_registry | Remote Registry Editor | Remote registry editing capabilities |
| remote_task_manager | Remote Task Manager | Remote process and service management |
| remote_reboot | Remote Reboot Options | Options for remotely rebooting devices |
| remote_wake | Wake-on-LAN | Support for Wake-on-LAN functionality |
| remote_power | Remote Power Management | Remote power management capabilities |
| attended_support | Attended Support | Support for attended remote sessions |
| unattended_support | Unattended Support | Support for unattended remote access |
| multi_monitor | Multi-Monitor Support | Support for multiple monitors in remote sessions for Built-In Methods (not third party) |
| session_recording | Session Recording | Recording of remote support sessions for Built-In Methods (not third party) |
| chat_support | Chat Support | Chat functionality during remote sessions for Built-In Methods (not third party) |
| file_transfer | File Transfer | File transfer capabilities during remote sessions for Built-In Methods (not third party) |
| clipboard_sync | Clipboard Synchronization | Synchronization of clipboard between technician and endpoint for Built-In Methods (not third party) |

## Compliance & Governance

| ID | Name | Description |
|----|------|-------------|
| role_based_access | Role-Based Access Control | Granular control over user permissions |
| audit_trail | Audit Trail | Comprehensive logging of user actions |
| compliance_reporting | Compliance Reporting | Reports for compliance purposes |
| data_retention | Data Retention Controls | Controls for data retention periods |
| data_sovereignty | Data Sovereignty | Controls for data sovereignty requirements |
| gdpr_compliance | GDPR Compliance | Features for GDPR compliance |
| hipaa_compliance | HIPAA Compliance | Features for HIPAA compliance |
| pci_compliance | PCI DSS Compliance | Features for PCI DSS compliance |
| soc2_compliance | SOC 2 Compliance | SOC 2 certification status |
| iso27001_compliance | ISO 27001 Compliance | ISO 27001 certification status |

## Performance & Scalability

| ID | Name | Description |
|----|------|-------------|
| max_endpoints | Maximum Endpoints | Maximum number of endpoints supported (or a guess) |
| performance_large | Performance at Scale | Performance characteristics with large deployments, scripts, monitoring or automations |
| database_scaling | Database Scaling | How the database scales with increasing data |
| reporting_performance | Reporting Performance | Performance of reporting with large datasets |
| high_availability | High Availability | High availability and redundancy features |
| disaster_recovery | Disaster Recovery | Disaster recovery capabilities |
| backup_restore | Backup and Restore | Backup and restore capabilities for the platform |
| maintenance_windows | Maintenance Windows | Scheduled maintenance windows and impact (for platform, not user enabled) |
| uptime_sla | Uptime SLA | Service level agreement for uptime (SaaS/CloudBased) |

## Support & Training

| ID | Name | Description |
|----|------|-------------|
| support_channels | Support Channels | Available channels for support (phone, email, chat) |
| support_hours | Support Hours | Hours during which support is available |
| support_response | Support Response Time | Typical response time for support requests |
| support_tiers | Support Tiers | Different tiers of support available |
| knowledge_base_quality | Knowledge Base Quality | Quality and comprehensiveness of knowledge base |
| community_forum | Community Forum | Availability and activity of community forum |
| training_resources | Training Resources | Available training resources |
| certification_program | Certification Program | Availability of certification program |
| onboarding_assistance | Onboarding Assistance | Assistance provided during onboarding |
| professional_services | Professional Services | Availability of professional services |

## Monitoring

| ID | Name | Description |
|----|------|-------------|
| server_monitoring | Server Monitoring | Monitoring capabilities for servers |
| workstation_monitoring | Workstation Monitoring | Monitoring capabilities for workstations |
| network_monitoring | Network Monitoring | Monitoring capabilities for network devices |
| custom_monitors | Custom Monitors | Ability to create custom monitoring checks |
| snmp_monitoring | SNMP Monitoring | Support for SNMP monitoring |
| alert_management | Alert Management | Management and configuration of monitoring alerts |
| threshold_based | Threshold-Based Monitoring | Monitoring based on defined thresholds |
| event_log_monitoring | Event Log Monitoring | Monitoring of system and application event logs |
| service_monitoring | Service Monitoring | Monitoring of Windows/Linux services |
| process_monitoring | Process Monitoring | Monitoring of system processes |
| performance_monitoring | Performance Monitoring | Monitoring of system performance metrics |

## Advanced Monitoring

| ID | Name | Description |
|----|------|-------------|
| predictive_monitoring | Predictive Monitoring | Ability to predict issues before they occur or as they occur |
| baseline_monitoring | Baseline Monitoring | Establishing and monitoring against baselines |
| correlation_analysis | Correlation Analysis | Analysis of correlated events across systems |
| business_service_monitoring | Business Service Monitoring | Monitoring of business services rather than just components |
| log_analysis | Log Analysis | Advanced analysis of log data |
| metric_collection | Custom Metric Collection | Collection of custom metrics |
| application_control | Application Control | Control over which applications can run |
| browser_monitoring | Browser Performance Monitoring | Monitoring of web browser performance |
| app_performance | Application Performance Monitoring | Monitoring of application performance metrics |
| user_experience | User Experience Monitoring | Monitoring of end-user experience metrics |

## Cloud & Modern Infrastructure

| ID | Name | Description |
|----|------|-------------|
| cloud_monitoring | Cloud Service Monitoring | Monitoring of cloud services (AWS, Azure, GCP) |
| container_monitoring | Container Monitoring | Monitoring of containerized environments |
| kubernetes_monitoring | Kubernetes Monitoring | Monitoring of Kubernetes clusters |
| serverless_monitoring | Serverless Monitoring | Monitoring of serverless functions |
| microservices_monitoring | Microservices Monitoring | Monitoring of microservices architectures |
| cloud_cost_management | Cloud Cost Management | Monitoring and management of cloud costs |
| cloud_security_monitoring | Cloud Security Monitoring | Monitoring of cloud security posture |
| iaas_monitoring | IaaS Monitoring | Monitoring of Infrastructure as a Service |
| paas_monitoring | PaaS Monitoring | Monitoring of Platform as a Service |
| saas_monitoring | SaaS Monitoring | Monitoring of Software as a Service |

## Advanced Security Features

| ID | Name | Description |
|----|------|-------------|
| edr_capabilities | EDR Capabilities | Endpoint Detection and Response capabilities |
| xdr_capabilities | XDR Capabilities | Extended Detection and Response capabilities |
| soar_integration | SOAR Integration | Integration with Security Orchestration, Automation and Response |
| threat_hunting | Threat Hunting | Tools for proactive threat hunting |
| incident_response | Incident Response | Tools for responding to security incidents |
| vulnerability_management | Vulnerability Management | Management of security vulnerabilities |
| security_posture_assessment | Security Posture Assessment | Assessment of overall security posture |
| security_awareness | Security Awareness Training | Integration with security awareness training |
| dark_web_monitoring | Dark Web Monitoring | Monitoring of dark web for compromised credentials |
| antivirus | Antivirus | Built-in or integrated antivirus capabilities |
| backup | Backup | Built-in or integrated backup capabilities |
| vulnerability_scanning | Vulnerability Scanning | Scanning for security vulnerabilities |
| disk_encryption | Disk Encryption Management | Management of disk encryption solutions |
| mfa | MFA Support | Multi-factor authentication support |
| ransomware_detection | Ransomware Detection | Detection of ransomware activity |
| endpoint_protection | Endpoint Protection | Comprehensive endpoint security features |
| firewall_management | Firewall Management | Management of firewall settings |
| security_policies | Security Policies | Enforcement of security policies |
| compliance_reporting | Compliance Reporting | Reporting on security compliance |
| siem_integration | SIEM Integration | Integration with Security Information and Event Management systems |

## Specialized Device Support

| ID | Name | Description |
|----|------|-------------|
| iot_monitoring | IoT Device Monitoring | Monitoring of Internet of Things devices |
| pos_monitoring | POS System Monitoring | Monitoring of Point of Sale systems |
| medical_device_monitoring | Medical Device Monitoring | Monitoring of medical devices |
| industrial_control_monitoring | Industrial Control System Monitoring | Monitoring of industrial control systems |
| kiosk_monitoring | Kiosk Monitoring | Monitoring of kiosk systems |
| thin_client_monitoring | Thin Client Monitoring | Monitoring of thin client devices |
| virtual_desktop_monitoring | Virtual Desktop Monitoring | Monitoring of virtual desktop infrastructure |

## Data Analysis & Business Intelligence

| ID | Name | Description |
|----|------|-------------|
| advanced_analytics | Advanced Analytics | Advanced data analytics capabilities |
| custom_dashboards | Custom Dashboards | Creation of custom dashboards |
| data_visualization | Data Visualization | Tools for visualizing data |
| trend_analysis | Trend Analysis | Analysis of trends over time |
| forecasting | Forecasting | Prediction of future trends based on historical data |
| report_scheduling | Report Scheduling | Scheduling of report generation and delivery |
| data_export | Data Export Options | Options for exporting data |
| data_api | Data API | API for accessing monitoring data |
| bi_integration | BI Tool Integration | Integration with business intelligence tools |
| custom_metrics | Custom Metrics | Creation of custom metrics and KPIs |

## Integration Ecosystem

| ID | Name | Description |
|----|------|-------------|
| integration_marketplace | Integration Marketplace | Marketplace for third-party integrations for easy acccess to enabling/management |
| webhook_support | Webhook Support | Support for webhooks for event-driven integrations |
| custom_integration | Custom Integration Development | Support for developing custom integrations |
| sso_integration | Single Sign-On | Support for SSO authentication |
| directory_sync | Directory Synchronization | Synchronization with directory services |
| ticketing_integration | Ticketing System Integration | Integration with external ticketing systems |
| documentation_integration | Documentation Integration | Integration with documentation platforms |
| quoting_integration | Quoting/Procurement Integration | Integration with quoting and procurement systems |
| accounting_integration | Accounting Integration | Integration with accounting software |

## Pricing, Costs, and Market

| ID | Name | Description |
|----|------|-------------|
| pricing_model | Pricing Model | Structure of pricing (per device, per user, etc.) |
| pricing_transparency | Pricing Transparency | Clarity and transparency of pricing |
| hidden_costs | Hidden Costs | Presence of additional or hidden costs |
| contract_flexibility | Contract Flexibility | Flexibility of contract terms |
| minimum_commitment | Minimum Commitment | Minimum commitment requirements |
| cancellation_terms | Cancellation Terms | Terms for cancelling service |
| implementation_costs | Implementation Costs | Costs associated with implementation |
| training_costs | Training Costs | Costs associated with training |
| vendor_focus | Vendor Focus | Whether RMM is a primary focus for the vendor |
| vendor_roadmap | Vendor Roadmap | Publicly available roadmap |
| partner_program | Partner Program | Quality of partner program |
| user_community | User Community | Size and activity of user community |
| third_party_ecosystem | Third-Party Ecosystem | Ecosystem of third-party integrations and add-ons |
| acquisition_history | Acquisition History | History of acquisitions by or of the vendor |
| market_share | Market Share | Estimated market share in the RMM space |