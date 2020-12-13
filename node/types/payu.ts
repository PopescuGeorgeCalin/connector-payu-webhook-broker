import { contains, Omit } from 'ramda'
import { Enum } from 'typescript-string-enums'
import { Optional } from 'utility-types'

type WithId<T> = T & { id: string }
export interface TransactionParams {
  transactionId: string
  amount: number
}

export interface ZoopAccount {
  marketplaceId: string
  publishableKey: string
}

interface SellerMetadata {
  due_days?: number
  body_instructions?: string
  available_plans?: string
}

interface PaymentMetadata {
  vtex_reference: Maybe<string>
  vtex_payment_id: string
  vtex_transaction_id: string
  vtex_tenant: string
  vtex_gtw_callback_url: string
  vtex_gtw_inbound_requests_url: string
  [key: string]: Maybe<string>
}

export interface EnterpriseSeller {
  id: string
  status: string
  resource: string
  type: LegalEntityKind
  description?: string
  account_balance: string
  current_balance: string
  business_name: string
  business_phone: string
  business_email: string
  business_website?: string
  business_description?: string
  business_opening_date: string
  business_facebook?: string
  business_twitter?: string
  ein: string
  statement_descriptor: string
  mcc?: string
  business_address: Address
  owner: Owner
  show_profile_online?: boolean
  is_mobile?: boolean
  decline_on_fail_security_code?: boolean
  decline_on_fail_zipcode?: boolean
  delinquent?: boolean
  payment_methods?: [unknown]
  default_debit?: unknown
  default_credit?: unknown
  merchant_code: string
  terminal_code?: string
  uri: string
  marketplace_id: string
  metadata: SellerMetadata
  created_at: string
  updated_at: string
}

export interface Address {
  line1: string
  line2: string
  line3?: string
  neighborhood?: string
  city: string
  state: string
  postal_code: string
  country_code: string
}

export interface BuyerAddress {
  line1: Maybe<string>
  line2: Maybe<string>
  line3?: Maybe<string>
  neighborhood?: Maybe<string>
  city: Maybe<string>
  state: Maybe<string>
  postal_code: Maybe<string>
  country_code: Maybe<string>
}

type Owner = IndividualSeller
export enum LegalEntityKind {
  business = 'business',
  individual = 'individual',
}

export interface IndividualSeller {
  id: string
  status: string
  resource: string
  type: LegalEntityKind
  account_balance: string
  current_balance: string
  first_name?: string
  last_name?: Maybe<string>
  email?: Maybe<string>
  description?: string
  taxpayer_id: string
  phone_number?: Maybe<string>
  birthdate?: string
  website?: string
  facebook?: string
  twitter?: string
  address: Address
  statement_descriptor?: string
  mcc?: string
  show_profile_online?: boolean
  is_mobile?: boolean
  decline_on_fail_security_code?: boolean
  decline_on_fail_zipcode?: boolean
  delinquent?: boolean
  payment_methods?: [unknown]
  default_debit?: unknown
  default_credit?: unknown
  merchant_code?: string
  terminal_code?: string
  uri: string
  marketplace_id?: string
  metadata: Maybe<SellerMetadata>
  created_at: string
  updated_at: string
}

type CreatedSellerFields =
  | 'marketplace_id'
  | 'type'
  | 'created_at'
  | 'updated_at'
  | 'uri'
  | 'id'
  | 'status'
  | 'resource'
  | 'account_balance'
  | 'current_balance'

export type IndividualSellerInput = Omit<IndividualSeller, CreatedSellerFields>
export type EnterpriseSellerInput = Omit<
  EnterpriseSeller,
  CreatedSellerFields | 'owner'
> & { owner: Omit<IndividualSellerInput, 'metadata'> }

export interface BalancesItems {
  current_balance: string
  account_balance: string
}

export interface Balances {
  resource: string
  uri: string
  items: BalancesItems
}

export interface Pagination<T> {
  resource: string
  uri: string
  items: T[]
  has_more: boolean
  limit: number
  total_pages: number
  page: number
  offset: string
  total: string
  query_count: string
}

export interface Receivable {
  id: string
  resource: string
  status: string
  recipient: string
  transaction: string
  split_rule?: unknown
  installment?: Maybe<string>
  liable: boolean
  amount: string
  gross_amount: string
  anticipation_fee: string
  paid_at?: Maybe<string>
  prepaid: boolean
  id_original_receivable?: Maybe<string>
  created_at: string
  transaction_created_at: string
  canceled_at?: string
  expected_on: string
  authorization_code?: string
}

export enum TransactionStatus {
  new = 'new',
  pending = 'pending',
  preAuthorized = 'pre_authorized',
  succeeded = 'succeeded',
  failed = 'failed',
  reversed = 'reversed',
  canceled = 'canceled',
  refunded = 'refunded',
  dispute = 'dispute',
  chargedBack = 'charged_back',
  partialRefunded = 'partial_refunded',
}

export enum TransactionPaymentType {
  boleto = 'boleto',
  credit = 'credit',
  debit = 'debit',
  wallet = 'wallet',
}

export interface Transaction {
  id: string
  resource: string
  status: TransactionStatus
  amount: string
  original_amount: string
  currency: string
  description?: Maybe<string>
  payment_type: TransactionPaymentType
  transaction_number: string
  gateway_authorizer: string
  app_transaction_uid?: string
  refunds?: unknown
  rewards?: unknown
  discounts?: unknown
  pre_authorization?: unknown
  sales_receipt: string
  on_behalf_of: string
  customer?: unknown
  statement_descriptor: string
  payment_method: CardPaymentMethod | BoletoPaymentMethod
  point_of_sale: PointOfSale
  installment_plan?: Maybe<InstallmentPlan>
  refunded: boolean
  voided: boolean
  captured: boolean
  fees: string
  fee_details?: Maybe<FeeDetailsEntity[]>
  location_latitude?: string
  location_longitude?: string
  individual?: IndividualSeller
  business?: EnterpriseSeller
  uri: string
  metadata: Maybe<PaymentMetadata>
  expected_on: string
  created_at: string
  updated_at: string
  payment_authorization?: PaymentAuthorization
  history: HistoryEntity[]
  reference_id?: Maybe<string>
  split_rules: Maybe<Array<WithId<SplitRule>>>
}

export interface PaymentMethod {
  id: string
  resource: string
  description?: string
  customer?: unknown
  metadata: object
  created_at: Date
  updated_at: Date
  uri: string
  address?: Address
  fingerprint?: string
}
export interface CardPaymentMethod extends PaymentMethod {
  card_brand: string
  first4_digits: string
  last4_digits: string
  expiration_month: string
  expiration_year: string
  holder_name: string
  is_active: boolean
  is_valid: boolean
  is_verified: boolean
  verification_checklist: VerificationChecklist
}

export interface BoletoPaymentMethod extends PaymentMethod {
  reference_number: string
  document_number: string
  expiration_date: Date
  recipient: string
  bank_code: string
  sequence: string
  url: string
  accepted: boolean
  printed: boolean
  downloaded: boolean
  paid_at?: unknown
  barcode: string
}

export interface VerificationChecklist {
  postal_code_check: string
  security_code_check: string
  address_line1_check: string
}

export type CaptureMode =
  | 'barcode'
  | 'magstripe'
  | 'magstripe_fallback'
  | 'chip'
  | 'manually_keyed'
  | 'wallet'

export interface PointOfSale {
  entry_mode: CaptureMode
  identification_number?: string
}

export type InstallmentPlanMode = 'interest_free' | 'with_interest'

export interface InstallmentPlan {
  number_installments: number
  mode: InstallmentPlanMode
}

export interface FeeDetailsEntity {
  amount: string
  prepaid: boolean
  currency: string
  type: string
  is_gateway_fee: boolean
  description: string
}

export interface PaymentAuthorization {
  authorizer_id: string
  authorization_code: string
  authorization_nsu: string
}

export type OperationType =
  | 'created'
  | 'authorization'
  | 'pre_authorization'
  | 'capture'
  | 'void'
  | 'disputed'
  | 'dispute_succeeded'
  | 'charged_back'
  | 'reversal'
  | 'void_confirmation'
  | 'paid'
  | 'refund'

export interface HistoryEntity {
  id: string
  transaction: string
  amount: string
  operation_type: OperationType
  status: string
  response_code?: Maybe<string>
  response_message?: undefined
  authorization_code?: Maybe<string>
  authorizer_id?: Maybe<string>
  authorization_nsu?: Maybe<string>
  created_at: string
}

export interface StatementTransfer {
  id: string
  authorization_code?: Maybe<string>
}

export interface StatementTransaction {
  id: string
  authorization_code: string
}

export interface Statement {
  date: string
  currentBalance: string
  items: StatementEntry[]
}

export interface StatementEntry {
  id: string
  resource: string
  nsu: string
  amount: string
  gross_amount: string
  fee: string
  date: string
  description: string
  current_balance: string
  type: string
  object_id: string
  object_type: string
  transaction?: Maybe<StatementTransaction>
  transfer?: Maybe<StatementTransfer>
}

export interface TransferReceipt {
  id: string
  resource: string
  type: string
  status: string
  status_detail?: unknown
  recipient: string
  sender: string
  amount: string
  original_amount: string
  currency: string
  description: string
  transfer_number?: string
  statement_descriptor?: string
  bank_account?: unknown
  transactions?: Transaction[]
  location_latitude?: string
  location_longitude?: string
  uri: string
  metadata: object
  confirmed: string
  created_at: string
  updated_at: string
  transfer_date: string
}

export interface PagingParams {
  limit: number
  offset: number
}

export interface FeeDetail {
  type: string
  card_brand: Maybe<string>
  percent_amount: number
  dollar_amount: number
  currency: string
  description: string
  payment_type: string
  number_installments: number
  settlement_days: number
  source: string
  prepaid: boolean
}

export interface Plan {
  id: string
  resource: string
  name: string
  invoice_name: string
  description: string
  is_active: boolean
  maximum_amount: number
  setup_cost: number
  date_start: Date
  date_end: Date
  interval: string
  interval_count: number
  duration_in_months: number
  grace_period_in_minutes: number
  is_default_per_transaction: boolean
  fee_details: FeeDetail[]
  uri: string
  visible: string
  created_at: Date
  updated_at: Date
}

export interface Subscription {
  id: string
  resource: string
  status: string
  seller?: unknown
  customer: string
  start_date: Date
  auto_collection: boolean
  payment_types: string[]
  trial_start?: unknown
  trial_end?: unknown
  current_term_start: Date
  current_term_end?: unknown
  quantity: number
  plan: Plan
}

export enum Order {
  ASC = 'time-ascending',
  DESC = 'time-descending',
}

interface Sortable {
  sort?: Order
}

export type TransactionsParams = PagingParams & Sortable
export interface ReceivablesParams extends PagingParams {
  status?: string
  orderBy?: string
  order?: Order
  expectedOn?: DateRange
  createdAt?: DateRange
}

export enum BankAccountType {
  checking = 'checking',
  saving = 'saving',
}

interface BankAccount {
  id?: string
  holder_name: string
  description?: string
  bank_name?: string
  bank_code: number
  type: BankAccountType
  last4_digits?: string
  coutry_code?: string
  routing_number: number
  account_number: number
  is_active?: boolean
  is_verified?: boolean
  debitable?: boolean
  customer?: unknown
  fingerprint?: string
  address?: unknown
  verification_checklist?: unknown
  metadata?: unknown
  uri?: string
  created_at?: Date
  updated_at?: Date
}

export interface EnterpriseBankAccount extends BankAccount {
  ein: string
}

export interface IndividualBankAccount extends BankAccount {
  taxpayer_id: string
}

export interface BankAccountToken {
  customer: string
  token: string
}

export type StatementsParams = PagingParams

export interface PrepaymentOrder {
  customer: string
  prepayment_date: string
  min_transaction_date?: string
  max_transaction_date?: string
  min_expected_date?: string
  max_expected_date?: string
  receivables?: string[]
  transactions?: string[]
  target_amount?: string
  margin?: string
  order: string
  partner_fee: string
  auto_commit: 0 | 1
}

export enum PrepaymentStatus {
  simulated = 'simulated',
  succeeded = 'succeeded',
  invalid = 'invalid',
  requested = 'requested',
  ready = 'ready',
}

export interface Prepayment {
  id: string
  prepayment_date: string
  status: PrepaymentStatus
  status_detail: string
  prepayment_gross_amount: string
  prepayment_net_amount: string
  receivables_count: string
  zoop_fee: string
  partner_fee: string
  created_at: string
  updated_at: string
}

export interface InternalWiretransferParams {
  receiver: string
  description: string
  amount: number
}

export type Seller = EnterpriseSeller | IndividualSeller

export interface Webhook {
  id?: string
  resource?: 'webhook'
  url: string
  method: 'POST'
  description: string
  status?: 'new' | 'registered' | 'active' | 'deleted'
  event: string[]
  last_error?: string
  retries?: number
  batches_sent?: number
  metadata?: Record<string, unknown>
  uri?: string
  created_at?: string
  updated_at?: string
}

export const TransactionEventType = Enum(
  'transaction.canceled',
  'transaction.succeeded',
  'transaction.failed',
  'transaction.reversed',
  'transaction.updated',
  'transaction.disputed',
  'transaction.dispute.succeeded',
  'transaction.charged_back'
)

export type TransactionEventType = Enum<typeof TransactionEventType>

export const TransferEventType = Enum(
  'transaction.canceled',
  'transaction.succeeded',
  'transaction.failed',
  'transaction.reversed',
  'transaction.updated',
  'transaction.disputed',
  'transaction.dispute.succeeded',
  'transaction.charged_back'
)

export type TransferEventType = Enum<typeof TransferEventType>

export const SellerEventType = Enum(
  'seller.updated',
  'seller.activated',
  'seller.enabled',
  'seller.deleted'
)

export type SellerEventType = Enum<typeof SellerEventType>

export const SubscriptionEventType = Enum(
  'subscription.created',
  'subscription.updated',
  'subscription.canceled'
)

export type SubscriptionEventType = Enum<typeof SubscriptionEventType>

export const ReceivablesEventType = Enum(
  'receivable.created',
  'receivable.paid',
  'receivable.refunded',
  'receivable.deleted',
  'receivable.canceled'
)

export type ReceivablesEventType = Enum<typeof ReceivablesEventType>

export const BankAccountEventType = Enum(
  'bank_account.created',
  'bank_account.associated',
  'bank_account.deactivated',
  'bank_account.deleted'
)

export type BankAccountEventType = Enum<typeof BankAccountEventType>

export const CardEventType = Enum(
  'card.created',
  'card.updated',
  'card.deactivated',
  'card.deleted'
)

export type CardEventType = Enum<typeof CardEventType>

export const DocumentEventType = Enum('document.updated', 'document.created')

export type DocumentEventType = Enum<typeof DocumentEventType>

export type WebhookEventType =
  | TransactionEventType
  | TransferEventType
  | SellerEventType
  | SubscriptionEventType
  | ReceivablesEventType
  | BankAccountEventType
  | CardEventType
  | DocumentEventType
  | 'all'

type WebhookEventStatus = 'new' | 'succeeded' | 'failed'
type WebhookEventSource = 'API' | 'Automatic'

export interface WebhookEvent {
  id: string
  resource: string
  type: WebhookEventType
  name: string
  status: WebhookEventStatus
  source: WebhookEventSource
  email_notification: boolean
  delivery_attempt: number
  metadata?: unknown
  created_at: Date
  updated_at: Date
}

export interface TransactionWebhookEvent extends WebhookEvent {
  type: TransactionEventType
  payload: { object: Transaction }
}

export interface SellerWebhookEvent extends WebhookEvent {
  type: SellerEventType
  payload: { object: Seller }
}

export interface SubscriptionWebhookEvent extends WebhookEvent {
  type: SubscriptionEventType
  payload: { object: Subscription }
}

export interface ReceivableWebhookEvent extends WebhookEvent {
  type: ReceivablesEventType
  payload: { object: Receivable }
}

export interface BankAccountWebhookEvent extends WebhookEvent {
  type: BankAccountEventType
  payload: { object: BankAccount }
}

export interface CardWebhookEvent extends WebhookEvent {
  type: CardEventType
  payload: { object: Card }
}

export interface DocumentWebhookEvent extends WebhookEvent {
  type: DocumentEventType
  payload: { object: DocumentData }
}

export type AcquiringWebhookEvent =
  | TransactionWebhookEvent
  | SellerWebhookEvent
  | SubscriptionWebhookEvent
  | ReceivableWebhookEvent
  | BankAccountWebhookEvent
  | CardWebhookEvent
  | DocumentWebhookEvent

export const isTransactionWebhook = (
  event: AcquiringWebhookEvent
): event is TransactionWebhookEvent =>
  contains(event.type, Enum.values(TransactionEventType))

export interface DocumentData {
  id: string
  resource: string
  name: string
  status: string
  path: string
  extension: string
  mime_type: string
  size: string
  md5: string
  description?: string
  category: DocumentCategory
  uploaded_by?: string
  owner: {
    id: string
    resource: string
    type: string
  }
  uploaded_ip?: string
  metadata?: unknown
  uri: string
  created_at: Date
  updated_at: Date
}

export interface Token {
  id: string
  resource: 'token'
  type: string
  used: boolean
  bank_account: IndividualBankAccount | EnterpriseBankAccount
  uri: string
  created_at: Date
  updated_at: Date
}

export interface DateRange {
  from?: string
  to?: string
}

export type DocumentCategory =
  | 'identificacao'
  | 'residencia'
  | 'atividade'
  | 'cnpj'
  | 'foto'

export interface AcquirerTransaction {
  on_behalf_of: Maybe<string>
  split_rules: Maybe<SplitRule[]>
  metadata: PaymentMetadata
  currency: string
  reference_id: string
}

export type BankInvoicePaymentType = 'boleto'
export interface BankInvoiceTransaction extends AcquirerTransaction {
  logo: Maybe<string>
  customer: string
  amount: number
  payment_method: BankInvoice
  payment_type: BankInvoicePaymentType
}

export interface BillingInstructions {
  late_fee: Maybe<BankInvoiceValueChange>
  interest: Maybe<BankInvoiceValueChange>
  discount: Maybe<BankInvoiceValueChange[]>
}

export interface BankInvoice {
  payment_limit_date: Maybe<string>
  expiration_date: Maybe<string>
  top_instructions: Maybe<string[]>
}

export interface SplitRule {
  recipient: string
  liable: 1 | 0
  charge_processing_fee: 1 | 0
  percentage: Maybe<number>
  amount: number | string
  id?: Maybe<string>
}

export type CardTransactionPaymentType = 'credit' | 'debit'

export interface CardTransaction extends AcquirerTransaction {
  source: Source
  capture: boolean
  payment_type: CardTransactionPaymentType
}

export type CardTransactionUsage = 'single_use' | 'token'

export type CardTransactionType =
  | 'card'
  | 'wallet'
  | 'card_and_wallet'
  | 'token'
  | 'customer'
  | 'three_d_secure'
  | 'debit_online'

interface Source {
  usage: CardTransactionUsage
  amount: number
  currency: string
  description: Maybe<string>
  type: CardTransactionType
  installment_plan: InstallmentPlan
  card: Card
}

export interface Card {
  holder_name: string
  expiration_month: string
  expiration_year: string
  security_code: string
  card_number: string
}

export type Buyer = Optional<Omit<IndividualSeller, 'address'>> & {
  taxpayer_id: string
  address: Maybe<BuyerAddress>
}

export type PaymentTransaction = { on_behalf_of: Maybe<string> } & (
  | CardTransaction
  | BankInvoiceTransaction)

export type BankInvoiceValueChangeMode = 'FIXED' | 'DAILY_AMOUNT'

export interface BankInvoiceValueChange {
  mode: BankInvoiceValueChangeMode
  amount: number
  limit_date: Maybe<string>
}
