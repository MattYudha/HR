CREATE TABLE public.app_approvals (
  id TEXT PRIMARY KEY,
  employee_id TEXT NOT NULL,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'PENDING',
  request_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  approved_date TIMESTAMP,
  approved_by TEXT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL,
  CONSTRAINT app_approvals_employee_id_fkey
    FOREIGN KEY (employee_id) REFERENCES public.app_employees(id)
);
CREATE TABLE public.app_attendances (
  id TEXT PRIMARY KEY,
  employee_id TEXT NOT NULL,
  check_in TIMESTAMP,
  check_out TIMESTAMP,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status TEXT DEFAULT 'PRESENT',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL,
  CONSTRAINT app_attendances_employee_id_fkey
    FOREIGN KEY (employee_id) REFERENCES public.app_employees(id)
);
CREATE TABLE public.app_employees (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  position TEXT,
  department TEXT,
  join_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  base_salary NUMERIC DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL,
  CONSTRAINT app_employees_user_id_fkey
    FOREIGN KEY (user_id) REFERENCES public.app_users(id)
);
CREATE TABLE public.app_kpis (
  id TEXT PRIMARY KEY,
  employee_id TEXT NOT NULL,
  period TEXT NOT NULL,
  score NUMERIC NOT NULL,
  category TEXT NOT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL,
  CONSTRAINT app_kpis_employee_id_fkey
    FOREIGN KEY (employee_id) REFERENCES public.app_employees(id)
);
CREATE TABLE public.app_payrolls (
  id TEXT PRIMARY KEY,
  employee_id TEXT NOT NULL,
  period TEXT NOT NULL,
  base_salary NUMERIC NOT NULL,
  allowances NUMERIC DEFAULT 0,
  deductions NUMERIC DEFAULT 0,
  total_salary NUMERIC NOT NULL,
  status TEXT DEFAULT 'PENDING',
  paid_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL,
  CONSTRAINT app_payrolls_employee_id_fkey
    FOREIGN KEY (employee_id) REFERENCES public.app_employees(id)
);
CREATE TABLE public.app_roles (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL
);
CREATE TABLE public.app_users (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  password TEXT NOT NULL,
  role_id TEXT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL,
  CONSTRAINT app_users_role_id_fkey
    FOREIGN KEY (role_id) REFERENCES public.app_roles(id)
);
CREATE TABLE public.approval_requests (
  approval_id INTEGER PRIMARY KEY,
  employee_id INTEGER,
  approval_type_id VARCHAR,
  approval_status VARCHAR,
  approval_date DATE,
  amount INTEGER,
  attachment_url VARCHAR,
  created_at TIMESTAMP,
  created_by VARCHAR,
  updated_at TIMESTAMP,
  updated_by VARCHAR,
  category_id INTEGER,
  CONSTRAINT approval_requests_employee_id_fkey
    FOREIGN KEY (employee_id) REFERENCES public.employees(employee_id),
  CONSTRAINT approval_requests_approval_type_id_fkey
    FOREIGN KEY (approval_type_id) REFERENCES public.approval_types(approval_type_id),
  CONSTRAINT approval_requests_category_id_fkey
    FOREIGN KEY (category_id) REFERENCES public.category_approvals(category_id)
);
CREATE TABLE public.approval_types (
  approval_type_id VARCHAR PRIMARY KEY,
  approval_type VARCHAR,
  created_at TIMESTAMP,
  created_by VARCHAR,
  updated_at TIMESTAMP,
  updated_by VARCHAR
);
CREATE TABLE public.approved (
  approved_id INTEGER PRIMARY KEY,
  approval_id INTEGER,
  approval_date DATE,
  approval_status VARCHAR,
  approved_by INTEGER,
  CONSTRAINT approved_approval_id_fkey
    FOREIGN KEY (approval_id) REFERENCES public.approval_requests(approval_id),
  CONSTRAINT approved_approved_by_fkey
    FOREIGN KEY (approved_by) REFERENCES public.employee_positions(employee_position_id)
);
CREATE TABLE public.attendance (
  attendance_id INTEGER PRIMARY KEY,
  employee_id INTEGER,
  status VARCHAR,
  work_date DATE,
  check_in TIMESTAMP,
  check_out TIMESTAMP,
  work_location VARCHAR,
  notes VARCHAR,
  CONSTRAINT attendance_employee_id_fkey
    FOREIGN KEY (employee_id) REFERENCES public.employees(employee_id)
);
CREATE TABLE public.bank_account (
  bank_account_id INTEGER PRIMARY KEY,
  employee_id INTEGER,
  bank_name VARCHAR,
  account_no VARCHAR,
  account_holder VARCHAR,
  CONSTRAINT bank_account_employee_id_fkey
    FOREIGN KEY (employee_id) REFERENCES public.employees(employee_id)
);
CREATE TABLE public.category_approvals (
  category_id INTEGER PRIMARY KEY,
  approval_type_id VARCHAR,
  category VARCHAR,
  CONSTRAINT category_approvals_approval_type_id_fkey
    FOREIGN KEY (approval_type_id) REFERENCES public.approval_types(approval_type_id)
);
CREATE TABLE public.departments (
  department_id INTEGER PRIMARY KEY,
  foundation_id VARCHAR,
  department_name VARCHAR,
  description VARCHAR,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  code VARCHAR,
  parent_id INTEGER,
  check_in TIME,
  check_out TIME,
  CONSTRAINT departments_foundation_id_fkey
    FOREIGN KEY (foundation_id) REFERENCES public.foundations(foundation_id)
);
CREATE TABLE public.document_identity (
  id INTEGER PRIMARY KEY,
  identity_type_id INTEGER,
  user_id VARCHAR,
  identity_number VARCHAR,
  file_name TEXT,
  description TEXT,
  CONSTRAINT document_identity_identity_type_id_fkey
    FOREIGN KEY (identity_type_id) REFERENCES public.identity_types(identity_types_id),
  CONSTRAINT document_identity_user_id_fkey
    FOREIGN KEY (user_id) REFERENCES public.users(user_id)
);
CREATE TABLE public.employees (
  employee_id INTEGER PRIMARY KEY,
  hire_date DATE,
  user_id VARCHAR,
  fullname VARCHAR,
  join_date DATE,
  resign_date DATE,
  emp_code VARCHAR,
  gender VARCHAR,
  npwp VARCHAR,
  place_of_birth VARCHAR,
  date_of_birth DATE,
  marital_status VARCHAR,
  religion_id INTEGER,
  education_level_id INTEGER,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  address TEXT,
  CONSTRAINT employees_user_id_fkey
    FOREIGN KEY (user_id) REFERENCES public.users(user_id),
  CONSTRAINT employees_education_level_id_fkey
    FOREIGN KEY (education_level_id) REFERENCES public.education_levels(educatin_level_id)
);
CREATE TABLE public.employee_families (
  nik VARCHAR PRIMARY KEY,
  no_kk VARCHAR,
  fullname VARCHAR,
  place_of_birth VARCHAR,
  date_of_birth DATE,
  employee_id INTEGER,
  gender VARCHAR,
  status_active INTEGER,
  CONSTRAINT employee_families_employee_id_fkey
    FOREIGN KEY (employee_id) REFERENCES public.employees(employee_id)
);
CREATE TABLE public.employee_kpi (
  emp_kpi_id INTEGER PRIMARY KEY,
  employee_id INTEGER,
  period_id INTEGER,
  template_id INTEGER,
  scale_id INTEGER,
  reviewer_id INTEGER,
  secondary_reviewer_id INTEGER,
  status VARCHAR,
  submitted_at TIMESTAMP,
  approved_at TIMESTAMP,
  locked_at TIMESTAMP,
  notes VARCHAR,
  CONSTRAINT employee_kpi_employee_id_fkey
    FOREIGN KEY (employee_id) REFERENCES public.employees(employee_id),
  CONSTRAINT employee_kpi_period_id_fkey
    FOREIGN KEY (period_id) REFERENCES public.kpi_period(period_id),
  CONSTRAINT employee_kpi_template_id_fkey
    FOREIGN KEY (template_id) REFERENCES public.kpi_template(template_id),
  CONSTRAINT employee_kpi_scale_id_fkey
    FOREIGN KEY (scale_id) REFERENCES public.kpi_scale(scale_id)
);
CREATE TABLE public.employee_kpi_item (
  emp_kpi_item_id INTEGER PRIMARY KEY,
  emp_kpi_id INTEGER,
  indicator_id INTEGER,
  weight NUMERIC,
  target_value NUMERIC,
  target_text VARCHAR,
  baseline_value NUMERIC,
  calc_method VARCHAR,
  unit VARCHAR,
  direction VARCHAR,
  sort_order INTEGER,
  CONSTRAINT employee_kpi_item_emp_kpi_id_fkey
    FOREIGN KEY (emp_kpi_id) REFERENCES public.employee_kpi(emp_kpi_id),
  CONSTRAINT employee_kpi_item_indicator_id_fkey
    FOREIGN KEY (indicator_id) REFERENCES public.kpi_indicator(indicator_id)
);
CREATE TABLE public.employee_pay_component (
  epc_id INTEGER PRIMARY KEY,
  employee_id INTEGER,
  component_id INTEGER,
  amount_override NUMERIC,
  rate_override NUMERIC,
  effective_from DATE,
  effective_to DATE,
  CONSTRAINT employee_pay_component_employee_id_fkey
    FOREIGN KEY (employee_id) REFERENCES public.employees(employee_id),
  CONSTRAINT employee_pay_component_component_id_fkey
    FOREIGN KEY (component_id) REFERENCES public.pay_component(component_id)
);
CREATE TABLE public.employee_positions (
  employee_position_id INTEGER PRIMARY KEY,
  employee_id INTEGER,
  position_id VARCHAR,
  department_id INTEGER,
  start_date DATE,
  end_date DATE,
  sk_file_name TEXT,
  sk_number VARCHAR,
  base_on_salary INTEGER,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  pay_grade_id INTEGER,
  CONSTRAINT employee_positions_employee_id_fkey
    FOREIGN KEY (employee_id) REFERENCES public.employees(employee_id),
  CONSTRAINT employee_positions_position_id_fkey
    FOREIGN KEY (position_id) REFERENCES public.job_positions(position_id),
  CONSTRAINT employee_positions_department_id_fkey
    FOREIGN KEY (department_id) REFERENCES public.departments(department_id)
);
CREATE TABLE public.education_levels (
  educatin_level_id INTEGER PRIMARY KEY,
  level INTEGER,
  create_at TIMESTAMP,
  create_by VARCHAR,
  update_at TIMESTAMP,
  update_by INTEGER
);
CREATE TABLE public.identity_types (
  identity_types_id INTEGER PRIMARY KEY,
  identity_type_name VARCHAR
);
CREATE TABLE public.job_positions (
  position_id VARCHAR PRIMARY KEY,
  level VARCHAR,
  salary_grade NUMERIC,
  title VARCHAR,
  description TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
CREATE TABLE public.pay_component (
  component_id INTEGER PRIMARY KEY,
  code VARCHAR,
  name VARCHAR,
  type VARCHAR,
  calc_basis INTEGER,
  taxable BOOLEAN,
  statutory BOOLEAN
);
CREATE TABLE public.pay_grade (
  pay_grade_id INTEGER PRIMARY KEY,
  name VARCHAR,
  currency VARCHAR,
  pay_schedule VARCHAR
);
CREATE TABLE public.pay_grade_component (
  pgc_id INTEGER PRIMARY KEY,
  pay_grade_id INTEGER,
  component_id INTEGER,
  default_amount NUMERIC,
  default_rate NUMERIC,
  is_active BOOLEAN,
  CONSTRAINT pay_grade_component_pay_grade_id_fkey
    FOREIGN KEY (pay_grade_id) REFERENCES public.pay_grade(pay_grade_id),
  CONSTRAINT pay_grade_component_component_id_fkey
    FOREIGN KEY (component_id) REFERENCES public.pay_component(component_id)
);
CREATE TABLE public.payroll_period (
  period_id INTEGER PRIMARY KEY,
  period_code VARCHAR,
  date_start DATE,
  date_end DATE,
  pay_date DATE,
  status VARCHAR
);
CREATE TABLE public.payslip (
  payslip_id INTEGER PRIMARY KEY,
  employee_id INTEGER,
  period_id INTEGER,
  gross_amount NUMERIC,
  total_deduction NUMERIC,
  net_amount NUMERIC,
  generated_at TIMESTAMP,
  status VARCHAR,
  CONSTRAINT payslip_employee_id_fkey
    FOREIGN KEY (employee_id) REFERENCES public.employees(employee_id),
  CONSTRAINT payslip_period_id_fkey
    FOREIGN KEY (period_id) REFERENCES public.payroll_period(period_id)
);
CREATE TABLE public.payslip_line (
  line_id INTEGER PRIMARY KEY,
  payslip_id INTEGER,
  component_id INTEGER,
  quantity NUMERIC,
  rate NUMERIC,
  amount NUMERIC,
  source_type VARCHAR,
  source_id INTEGER,
  CONSTRAINT payslip_line_payslip_id_fkey
    FOREIGN KEY (payslip_id) REFERENCES public.payslip(payslip_id),
  CONSTRAINT payslip_line_component_id_fkey
    FOREIGN KEY (component_id) REFERENCES public.pay_component(component_id)
);
CREATE TABLE public.kpi_category (
  category_id INTEGER PRIMARY KEY,
  code VARCHAR,
  name VARCHAR,
  description VARCHAR
);
CREATE TABLE public.kpi_indicator (
  indicator_id INTEGER PRIMARY KEY,
  category_id INTEGER,
  code VARCHAR UNIQUE,
  name VARCHAR,
  description VARCHAR,
  unit VARCHAR,
  calc_method VARCHAR,
  formula VARCHAR,
  direction VARCHAR,
  default_weight NUMERIC,
  is_active BOOLEAN,
  CONSTRAINT kpi_indicator_category_id_fkey
    FOREIGN KEY (category_id) REFERENCES public.kpi_category(category_id)
);
CREATE TABLE public.kpi_scale (
  scale_id INTEGER PRIMARY KEY,
  name VARCHAR,
  min_value NUMERIC,
  max_value NUMERIC,
  step NUMERIC,
  description VARCHAR
);
CREATE TABLE public.kpi_scale_level (
  level_id INTEGER PRIMARY KEY,
  scale_id INTEGER,
  value NUMERIC,
  label VARCHAR,
  description VARCHAR,
  CONSTRAINT kpi_scale_level_scale_id_fkey
    FOREIGN KEY (scale_id) REFERENCES public.kpi_scale(scale_id)
);
CREATE TABLE public.kpi_template (
  template_id INTEGER PRIMARY KEY,
  name VARCHAR,
  description VARCHAR,
  department_id INTEGER,
  position_id INTEGER,
  pay_grade_id INTEGER,
  scale_id INTEGER,
  is_active BOOLEAN,
  CONSTRAINT kpi_template_scale_id_fkey
    FOREIGN KEY (scale_id) REFERENCES public.kpi_scale(scale_id)
);
CREATE TABLE public.kpi_template_item (
  template_item_id INTEGER PRIMARY KEY,
  template_id INTEGER,
  indicator_id INTEGER,
  weight NUMERIC,
  target_value NUMERIC,
  target_text VARCHAR,
  baseline_value NUMERIC,
  CONSTRAINT kpi_template_item_template_id_fkey
    FOREIGN KEY (template_id) REFERENCES public.kpi_template(template_id),
  CONSTRAINT kpi_template_item_indicator_id_fkey
    FOREIGN KEY (indicator_id) REFERENCES public.kpi_indicator(indicator_id)
);
CREATE TABLE public.kpi_period (
  period_id INTEGER PRIMARY KEY,
  code VARCHAR,
  name VARCHAR,
  date_start DATE,
  date_end DATE,
  frequency VARCHAR,
  status VARCHAR
);
CREATE TABLE public.kpi_checkin (
  checkin_id INTEGER PRIMARY KEY,
  emp_kpi_item_id INTEGER,
  checkin_date DATE,
  actual_value NUMERIC,
  comment VARCHAR,
  created_by INTEGER,
  created_at TIMESTAMP,
  CONSTRAINT kpi_checkin_emp_kpi_item_id_fkey
    FOREIGN KEY (emp_kpi_item_id) REFERENCES public.employee_kpi_item(emp_kpi_item_id)
);
CREATE TABLE public.kpi_evidence (
  evidence_id INTEGER PRIMARY KEY,
  emp_kpi_item_id INTEGER,
  checkin_id INTEGER,
  title VARCHAR,
  url VARCHAR,
  uploaded_by INTEGER,
  uploaded_at TIMESTAMP,
  CONSTRAINT kpi_evidence_emp_kpi_item_id_fkey
    FOREIGN KEY (emp_kpi_item_id) REFERENCES public.employee_kpi_item(emp_kpi_item_id),
  CONSTRAINT kpi_evidence_checkin_id_fkey
    FOREIGN KEY (checkin_id) REFERENCES public.kpi_checkin(checkin_id)
);
CREATE TABLE public.kpi_score (
  score_id INTEGER PRIMARY KEY,
  emp_kpi_id INTEGER,
  calc_date TIMESTAMP,
  method VARCHAR,
  weighted_score NUMERIC,
  rating_value NUMERIC,
  rating_label VARCHAR,
  normalized_score NUMERIC,
  details_json TEXT,
  locked BOOLEAN,
  CONSTRAINT kpi_score_emp_kpi_id_fkey
    FOREIGN KEY (emp_kpi_id) REFERENCES public.employee_kpi(emp_kpi_id)
);
CREATE TABLE public.kpi_review (
  review_id INTEGER PRIMARY KEY,
  emp_kpi_id INTEGER,
  reviewer_id INTEGER,
  review_stage VARCHAR,
  review_date DATE,
  comment TEXT,
  overall_rating NUMERIC,
  CONSTRAINT kpi_review_emp_kpi_id_fkey
    FOREIGN KEY (emp_kpi_id) REFERENCES public.employee_kpi(emp_kpi_id)
);
CREATE TABLE public.kpi_approval (
  approval_id INTEGER PRIMARY KEY,
  emp_kpi_id INTEGER,
  step INTEGER,
  approver_id INTEGER,
  action VARCHAR,
  comment VARCHAR,
  action_at TIMESTAMP,
  CONSTRAINT kpi_approval_emp_kpi_id_fkey
    FOREIGN KEY (emp_kpi_id) REFERENCES public.employee_kpi(emp_kpi_id)
);
CREATE TABLE public.foundations (
  foundation_id VARCHAR PRIMARY KEY,
  foundation_name VARCHAR,
  email VARCHAR,
  phone VARCHAR,
  address TEXT,
  status INTEGER
);
CREATE TABLE public.users (
  user_id VARCHAR PRIMARY KEY,
  foundation_id VARCHAR,
  name VARCHAR,
  role_id VARCHAR,
  phone VARCHAR,
  password VARCHAR,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  last_login TIMESTAMP,
  profile_picture VARCHAR,
  email VARCHAR UNIQUE,
  active BOOLEAN,
  CONSTRAINT users_foundation_id_fkey
    FOREIGN KEY (foundation_id) REFERENCES public.foundations(foundation_id)
);
CREATE TABLE public.document_identity (
  id INTEGER PRIMARY KEY,
  identity_type_id INTEGER,
  user_id VARCHAR,
  identity_number VARCHAR,
  file_name TEXT,
  description TEXT,
  CONSTRAINT document_identity_identity_type_id_fkey
    FOREIGN KEY (identity_type_id) REFERENCES public.identity_types(identity_types_id),
  CONSTRAINT document_identity_user_id_fkey
    FOREIGN KEY (user_id) REFERENCES public.users(user_id)
);
CREATE TABLE public.identity_types (
  identity_types_id INTEGER PRIMARY KEY,
  identity_type_name VARCHAR
);
CREATE TABLE public.departments (
  department_id INTEGER PRIMARY KEY,
  foundation_id VARCHAR,
  department_name VARCHAR,
  description VARCHAR,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  code VARCHAR,
  parent_id INTEGER,
  check_in TIME,
  check_out TIME,
  CONSTRAINT departments_foundation_id_fkey
    FOREIGN KEY (foundation_id) REFERENCES public.foundations(foundation_id)
);
CREATE TABLE public.job_positions (
  position_id VARCHAR PRIMARY KEY,
  level VARCHAR,
  salary_grade NUMERIC,
  title VARCHAR,
  description TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
CREATE TABLE public.education_levels (
  educatin_level_id INTEGER PRIMARY KEY,
  level INTEGER,
  create_at TIMESTAMP,
  create_by VARCHAR,
  update_at TIMESTAMP,
  update_by INTEGER
);
CREATE TABLE public.category_approvals (
  category_id INTEGER PRIMARY KEY,
  approval_type_id VARCHAR,
  category VARCHAR,
  CONSTRAINT category_approvals_approval_type_id_fkey
    FOREIGN KEY (approval_type_id) REFERENCES public.approval_types(approval_type_id)
);
CREATE TABLE public.approval_types (
  approval_type_id VARCHAR PRIMARY KEY,
  approval_type VARCHAR,
  created_at TIMESTAMP,
  created_by VARCHAR,
  updated_at TIMESTAMP,
  updated_by VARCHAR
);
CREATE TABLE public.approval_requests (
  approval_id INTEGER PRIMARY KEY,
  employee_id INTEGER,
  approval_type_id VARCHAR,
  approval_status VARCHAR,
  approval_date DATE,
  amount INTEGER,
  attachment_url VARCHAR,
  created_at TIMESTAMP,
  created_by VARCHAR,
  updated_at TIMESTAMP,
  updated_by VARCHAR,
  category_id INTEGER,
  CONSTRAINT approval_requests_employee_id_fkey
    FOREIGN KEY (employee_id) REFERENCES public.employees(employee_id),
  CONSTRAINT approval_requests_approval_type_id_fkey
    FOREIGN KEY (approval_type_id) REFERENCES public.approval_types(approval_type_id),
  CONSTRAINT approval_requests_category_id_fkey
    FOREIGN KEY (category_id) REFERENCES public.category_approvals(category_id)
);
CREATE TABLE public.approved (
  approved_id INTEGER PRIMARY KEY,
  approval_id INTEGER,
  approval_date DATE,
  approval_status VARCHAR,
  approved_by INTEGER,
  CONSTRAINT approved_approval_id_fkey
    FOREIGN KEY (approval_id) REFERENCES public.approval_requests(approval_id),
  CONSTRAINT approved_approved_by_fkey
    FOREIGN KEY (approved_by) REFERENCES public.employee_positions(employee_position_id)
);
CREATE TABLE public.attendance (
  attendance_id INTEGER PRIMARY KEY,
  employee_id INTEGER,
  status VARCHAR,
  work_date DATE,
  check_in TIMESTAMP,
  check_out TIMESTAMP,
  work_location VARCHAR,
  notes VARCHAR,
  CONSTRAINT attendance_employee_id_fkey
    FOREIGN KEY (employee_id) REFERENCES public.employees(employee_id)
);
CREATE SEQUENCE public.approval_requests_approval_id_seq
    AS INTEGER START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
CREATE SEQUENCE public.approved_approved_id_seq
    AS INTEGER START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
CREATE SEQUENCE public.attendance_attendance_id_seq
    AS INTEGER START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
CREATE SEQUENCE public.bank_account_bank_account_id_seq
    AS INTEGER START WITH 1 INCREMENT BY 1 CACHE 1;
CREATE SEQUENCE public.category_approvals_category_id_seq
    AS INTEGER START WITH 1 INCREMENT BY 1 CACHE 1;
CREATE SEQUENCE public.departments_department_id_seq
    START WITH 1 INCREMENT BY 1 CACHE 1;
CREATE SEQUENCE public.document_identity_id_seq
    START WITH 1 INCREMENT BY 1 CACHE 1;
CREATE SEQUENCE public.education_levels_educatin_level_id_seq
    START WITH 1 INCREMENT BY 1 CACHE 1;
CREATE SEQUENCE public.employee_kpi_emp_kpi_id_seq
    START WITH 1 INCREMENT BY 1 CACHE 1;
CREATE SEQUENCE public.employee_kpi_item_emp_kpi_item_id_seq
    START WITH 1 INCREMENT BY 1 CACHE 1;
CREATE SEQUENCE public.employee_pay_component_epc_id_seq
    START WITH 1 INCREMENT BY 1 CACHE 1;
CREATE SEQUENCE public.employee_positions_employee_position_id_seq
    START WITH 1 INCREMENT BY 1 CACHE 1;
CREATE SEQUENCE public.employees_employee_id_seq
    START WITH 1 INCREMENT BY 1 CACHE 1;
CREATE SEQUENCE public.identity_types_identity_types_id_seq
    START WITH 1 INCREMENT BY 1 CACHE 1;
CREATE SEQUENCE public.kpi_approval_approval_id_seq
    START WITH 1 INCREMENT BY 1 CACHE 1;
CREATE SEQUENCE public.kpi_category_category_id_seq
    START WITH 1 INCREMENT BY 1 CACHE 1;
CREATE SEQUENCE public.kpi_checkin_checkin_id_seq
    START WITH 1 INCREMENT BY 1 CACHE 1;
CREATE SEQUENCE public.kpi_evidence_evidence_id_seq
    START WITH 1 INCREMENT BY 1 CACHE 1;
CREATE SEQUENCE public.kpi_indicator_indicator_id_seq
    START WITH 1 INCREMENT BY 1 CACHE 1;
CREATE SEQUENCE public.kpi_period_period_id_seq
    START WITH 1 INCREMENT BY 1 CACHE 1;
CREATE SEQUENCE public.kpi_review_review_id_seq
    START WITH 1 INCREMENT BY 1 CACHE 1;
CREATE SEQUENCE public.kpi_scale_level_level_id_seq
    START WITH 1 INCREMENT BY 1 CACHE 1;
CREATE SEQUENCE public.kpi_scale_scale_id_seq
    START WITH 1 INCREMENT BY 1 CACHE 1;
CREATE SEQUENCE public.kpi_score_score_id_seq
    START WITH 1 INCREMENT BY 1 CACHE 1;
CREATE SEQUENCE public.kpi_template_item_template_item_id_seq
    START WITH 1 INCREMENT BY 1 CACHE 1;
CREATE SEQUENCE public.kpi_template_template_id_seq
    START WITH 1 INCREMENT BY 1 CACHE 1;
CREATE SEQUENCE public.pay_component_component_id_seq
    START WITH 1 INCREMENT BY 1 CACHE 1;
CREATE SEQUENCE public.pay_grade_component_pgc_id_seq
    START WITH 1 INCREMENT BY 1 CACHE 1;
CREATE SEQUENCE public.pay_grade_pay_grade_id_seq
    START WITH 1 INCREMENT BY 1 CACHE 1;
CREATE SEQUENCE public.payroll_period_period_id_seq
    START WITH 1 INCREMENT BY 1 CACHE 1;
CREATE SEQUENCE public.payslip_line_line_id_seq
    START WITH 1 INCREMENT BY 1 CACHE 1;
CREATE SEQUENCE public.payslip_payslip_id_seq
    START WITH 1 INCREMENT BY 1 CACHE 1;
ALTER TABLE public.approval_requests
  ALTER COLUMN approval_id SET DEFAULT nextval('approval_requests_approval_id_seq');

ALTER TABLE public.approved
  ALTER COLUMN approved_id SET DEFAULT nextval('approved_approved_id_seq');

ALTER TABLE public.attendance
  ALTER COLUMN attendance_id SET DEFAULT nextval('attendance_attendance_id_seq');

ALTER TABLE public.bank_account
  ALTER COLUMN bank_account_id SET DEFAULT nextval('bank_account_bank_account_id_seq');

ALTER TABLE public.category_approvals
  ALTER COLUMN category_id SET DEFAULT nextval('category_approvals_category_id_seq');

ALTER TABLE public.departments
  ALTER COLUMN department_id SET DEFAULT nextval('departments_department_id_seq');

ALTER TABLE public.document_identity
  ALTER COLUMN id SET DEFAULT nextval('document_identity_id_seq');

ALTER TABLE public.education_levels
  ALTER COLUMN educatin_level_id SET DEFAULT nextval('education_levels_educatin_level_id_seq');

ALTER TABLE public.employee_kpi
  ALTER COLUMN emp_kpi_id SET DEFAULT nextval('employee_kpi_emp_kpi_id_seq');

ALTER TABLE public.employee_kpi_item
  ALTER COLUMN emp_kpi_item_id SET DEFAULT nextval('employee_kpi_item_emp_kpi_item_id_seq');

ALTER TABLE public.employee_pay_component
  ALTER COLUMN epc_id SET DEFAULT nextval('employee_pay_component_epc_id_seq');

ALTER TABLE public.employee_positions
  ALTER COLUMN employee_position_id SET DEFAULT nextval('employee_positions_employee_position_id_seq');

ALTER TABLE public.employees
  ALTER COLUMN employee_id SET DEFAULT nextval('employees_employee_id_seq');

ALTER TABLE public.identity_types
  ALTER COLUMN identity_types_id SET DEFAULT nextval('identity_types_identity_types_id_seq');

ALTER TABLE public.kpi_approval
  ALTER COLUMN approval_id SET DEFAULT nextval('kpi_approval_approval_id_seq');

ALTER TABLE public.kpi_category
  ALTER COLUMN category_id SET DEFAULT nextval('kpi_category_category_id_seq');

ALTER TABLE public.kpi_checkin
  ALTER COLUMN checkin_id SET DEFAULT nextval('kpi_checkin_checkin_id_seq');

ALTER TABLE public.kpi_evidence
  ALTER COLUMN evidence_id SET DEFAULT nextval('kpi_evidence_evidence_id_seq');

ALTER TABLE public.kpi_indicator
  ALTER COLUMN indicator_id SET DEFAULT nextval('kpi_indicator_indicator_id_seq');

ALTER TABLE public.kpi_period
  ALTER COLUMN period_id SET DEFAULT nextval('kpi_period_period_id_seq');

ALTER TABLE public.kpi_review
  ALTER COLUMN review_id SET DEFAULT nextval('kpi_review_review_id_seq');

ALTER TABLE public.kpi_scale_level
  ALTER COLUMN level_id SET DEFAULT nextval('kpi_scale_level_level_id_seq');

ALTER TABLE public.kpi_scale
  ALTER COLUMN scale_id SET DEFAULT nextval('kpi_scale_scale_id_seq');

ALTER TABLE public.kpi_score
  ALTER COLUMN score_id SET DEFAULT nextval('kpi_score_score_id_seq');

ALTER TABLE public.kpi_template_item
  ALTER COLUMN template_item_id SET DEFAULT nextval('kpi_template_item_template_item_id_seq');

ALTER TABLE public.kpi_template
  ALTER COLUMN template_id SET DEFAULT nextval('kpi_template_template_id_seq');

ALTER TABLE public.pay_component
  ALTER COLUMN component_id SET DEFAULT nextval('pay_component_component_id_seq');

ALTER TABLE public.pay_grade_component
  ALTER COLUMN pgc_id SET DEFAULT nextval('pay_grade_component_pgc_id_seq');

ALTER TABLE public.pay_grade
  ALTER COLUMN pay_grade_id SET DEFAULT nextval('pay_grade_pay_grade_id_seq');

ALTER TABLE public.payroll_period
  ALTER COLUMN period_id SET DEFAULT nextval('payroll_period_period_id_seq');

ALTER TABLE public.payslip_line
  ALTER COLUMN line_id SET DEFAULT nextval('payslip_line_line_id_seq');

ALTER TABLE public.payslip
  ALTER COLUMN payslip_id SET DEFAULT nextval('payslip_payslip_id_seq');
CREATE UNIQUE INDEX users_email_key ON public.users(email);
CREATE UNIQUE INDEX kpi_indicator_code_key ON public.kpi_indicator(code);
