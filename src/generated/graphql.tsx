import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  getBranches: Array<Branch>;
  getBranch?: Maybe<Branch>;
  me?: Maybe<User>;
  getUsers: Array<User>;
  getUser?: Maybe<User>;
  getAccounts: Array<Account>;
  getAccount?: Maybe<Account>;
  getAssets: Array<Asset>;
  getAsset?: Maybe<Asset>;
  getAttendances: Array<Attendance>;
  getAttendance: Array<Attendance>;
  getExpenses: Array<Expense>;
  getExpense?: Maybe<Expense>;
  getIncentives: Array<Incentive>;
  getIncentiveSheets: Array<IncentiveSheet>;
  getIncentiveSheet?: Maybe<IncentiveSheet>;
  getNotes: Array<Note>;
  getNote?: Maybe<Note>;
  getPayments: Array<Payment>;
  getPayment?: Maybe<Payment>;
  getProducts: Array<Product>;
  getProduct?: Maybe<Product>;
  getPurchases: Array<Purchase>;
  getPurchase?: Maybe<Purchase>;
  getRoles: Array<Role>;
  getRORs: Array<Ror>;
  getSales: Array<Sale>;
  getSale?: Maybe<Sale>;
  getRegions: Array<Region>;
};


export type QueryGetBranchArgs = {
  id: Scalars['Float'];
};


export type QueryGetUsersArgs = {
  employee?: Maybe<Scalars['Boolean']>;
};


export type QueryGetUserArgs = {
  id: Scalars['Float'];
};


export type QueryGetAccountsArgs = {
  branch?: Maybe<Scalars['Float']>;
};


export type QueryGetAccountArgs = {
  id: Scalars['Float'];
};


export type QueryGetAssetsArgs = {
  branch?: Maybe<Scalars['Float']>;
};


export type QueryGetAssetArgs = {
  id: Scalars['Float'];
};


export type QueryGetAttendancesArgs = {
  end: Scalars['DateTime'];
  start: Scalars['DateTime'];
  branch: Scalars['Float'];
};


export type QueryGetAttendanceArgs = {
  end: Scalars['DateTime'];
  start: Scalars['DateTime'];
  id: Scalars['Float'];
};


export type QueryGetExpenseArgs = {
  id: Scalars['Float'];
};


export type QueryGetIncentivesArgs = {
  staff: Scalars['Float'];
  end: Scalars['DateTime'];
  start: Scalars['DateTime'];
};


export type QueryGetIncentiveSheetArgs = {
  id: Scalars['Float'];
};


export type QueryGetNotesArgs = {
  user: Scalars['Float'];
};


export type QueryGetNoteArgs = {
  id: Scalars['Float'];
};


export type QueryGetPaymentArgs = {
  id: Scalars['Float'];
};


export type QueryGetProductArgs = {
  id: Scalars['Float'];
};


export type QueryGetPurchaseArgs = {
  id: Scalars['Float'];
};


export type QueryGetRoRsArgs = {
  id: Scalars['Float'];
};


export type QueryGetSaleArgs = {
  id: Scalars['Float'];
};

export type Branch = {
  __typename?: 'Branch';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  name: Scalars['String'];
  phone: Scalars['String'];
  regionId: Scalars['Float'];
  region: Region;
  accounts: Array<Account>;
  street: Scalars['String'];
  users: Array<User>;
  assets: Array<Asset>;
};

export type Region = {
  __typename?: 'Region';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  name: Scalars['String'];
  branches: Array<Branch>;
};

export type Account = {
  __typename?: 'Account';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  name: Scalars['String'];
  number: Scalars['String'];
  balance: Scalars['Float'];
  branchId: Scalars['Float'];
  branch: Branch;
  creatorId: Scalars['Float'];
  creator: User;
  payments: Array<Payment>;
  sales: Array<Sale>;
  purchases: Array<Purchase>;
  expenses: Array<Expense>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  name: Scalars['String'];
  email: Scalars['String'];
  phone: Scalars['String'];
  location: Scalars['String'];
  maxCredit: Scalars['Float'];
  creditDays: Scalars['Float'];
  credit: Scalars['Boolean'];
  balance: Scalars['Float'];
  salary: Scalars['Float'];
  employee: Scalars['Boolean'];
  roleId: Scalars['Float'];
  role: Role;
  branchId: Scalars['Float'];
  branch: Branch;
  notes: Array<Note>;
  createdPurchases: Array<Purchase>;
  createdPayments: Array<Payment>;
  suppliedPurchases: Array<Purchase>;
  RORS: Array<Ror>;
  createdAttendances: Array<Attendance>;
  attendances: Array<Attendance>;
  payments: Array<Payment>;
  collections: Array<Payment>;
  sheet: Array<IncentiveSheet>;
  sheetId: Scalars['Float'];
  incentive: Scalars['Boolean'];
  incentives: Array<Incentive>;
  servedSales: Array<Sale>;
  createdSales: Array<Sale>;
  createdExpenses: Array<Expense>;
  initiatedSales: Array<Sale>;
  authorizedExpenses: Array<Expense>;
  receivedExpenses: Array<Expense>;
  createdAccounts: Array<Account>;
  createdAssets: Array<Asset>;
  createdIncentiveSheets: Array<IncentiveSheet>;
  createdProducts: Array<Product>;
};

export type Role = {
  __typename?: 'Role';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  users: Array<User>;
  name: Scalars['String'];
};

export type Note = {
  __typename?: 'Note';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  title: Scalars['String'];
  details: Scalars['String'];
  creatorId: Scalars['Float'];
  creator: User;
};

export type Purchase = {
  __typename?: 'Purchase';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  purchaseDate: Scalars['String'];
  supplierId: Scalars['Float'];
  productId: Scalars['Float'];
  quantity: Scalars['Float'];
  purchasePrice: Scalars['Float'];
  sellingPrice: Scalars['Float'];
  pieceSellingPrice: Scalars['Float'];
  receipt: Scalars['String'];
  creatorId: Scalars['Float'];
  accountId: Scalars['Float'];
  creator: User;
  account: Account;
  supplier: User;
  product: Product;
};

export type Product = {
  __typename?: 'Product';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  creatorId: Scalars['Float'];
  creator: User;
  name: Scalars['String'];
  unit: Scalars['String'];
  pieceUnit: Scalars['String'];
  pieces: Scalars['Float'];
  purchases: Array<Purchase>;
  incentiveSheets: Array<IncentiveSheet>;
  incentives: Array<Incentive>;
  sold: Array<Sale>;
  stock: Scalars['Float'];
  pieceStock: Scalars['Float'];
  sellingPrice: Scalars['Float'];
  pieceSellingPrice: Scalars['Float'];
};

export type IncentiveSheet = {
  __typename?: 'IncentiveSheet';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  creatorId: Scalars['Float'];
  creator: User;
  startDate: Scalars['String'];
  endDate: Scalars['String'];
  name: Scalars['String'];
  state: Scalars['String'];
  sheetNo: Scalars['Float'];
  productId: Scalars['Float'];
  product: Product;
  incentivePrice: Scalars['Float'];
  users: Array<User>;
};

export type Incentive = {
  __typename?: 'Incentive';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  staffId: Scalars['Float'];
  staff: User;
  productId: Scalars['Float'];
  product: Product;
  saleId: Scalars['Float'];
  quantity: Scalars['Float'];
  incentivePrice: Scalars['Float'];
  sale: Sale;
};

export type Sale = {
  __typename?: 'Sale';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  saleDate: Scalars['String'];
  clientId: Scalars['Float'];
  client: User;
  productId: Scalars['Float'];
  product: Product;
  quantity: Scalars['Float'];
  pieceQuantity: Scalars['Float'];
  sellingPrice: Scalars['Float'];
  pieceSellingPrice: Scalars['Float'];
  creatorId: Scalars['Float'];
  creator: User;
  sellerId: Scalars['Float'];
  seller: User;
  accountId: Scalars['Float'];
  account: Account;
  payed: Scalars['Float'];
  incentive: Incentive;
};

export type Payment = {
  __typename?: 'Payment';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  paymentDate: Scalars['String'];
  payerId: Scalars['Float'];
  collectorId: Scalars['Float'];
  details: Scalars['String'];
  ammount: Scalars['Float'];
  creatorId: Scalars['Float'];
  creator: User;
  payer: User;
  collector: User;
  accountId: Scalars['Float'];
  account: Account;
};

export type Ror = {
  __typename?: 'ROR';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  name: Scalars['String'];
  buying: Scalars['Float'];
  selling: Scalars['Float'];
  pieces?: Maybe<Scalars['Float']>;
  creatorId: Scalars['Float'];
  creator: User;
};

export type Attendance = {
  __typename?: 'Attendance';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  arrivedAt: Scalars['String'];
  attended: Scalars['Boolean'];
  comment: Scalars['String'];
  attendeeId: Scalars['Float'];
  creatorId: Scalars['Float'];
  creator: User;
};

export type Expense = {
  __typename?: 'Expense';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  expenseDate: Scalars['String'];
  authorizerId: Scalars['Float'];
  authorizer: User;
  staffId: Scalars['Float'];
  staff: User;
  assetId: Scalars['Float'];
  asset: Asset;
  type: Scalars['String'];
  title: Scalars['String'];
  details: Scalars['String'];
  ammount: Scalars['Float'];
  creatorId: Scalars['Float'];
  creator: User;
  accountId: Scalars['Float'];
  account: Account;
};

export type Asset = {
  __typename?: 'Asset';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  name: Scalars['String'];
  code: Scalars['String'];
  condition: Scalars['String'];
  details: Scalars['String'];
  branchId: Scalars['Float'];
  branch: Branch;
  creatorId: Scalars['Float'];
  creator: User;
  receivedExpenses: Array<Expense>;
};


export type Mutation = {
  __typename?: 'Mutation';
  addBranch: BooleanResponse;
  editBranch: BooleanResponse;
  deleteBranch: BooleanResponse;
  forgotPassword: BooleanResponse;
  resetPassword: UserResponse;
  register: BooleanResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  addAccount: BooleanResponse;
  editAccount: BooleanResponse;
  changeAmmount: BooleanResponse;
  deleteAccount: BooleanResponse;
  addAsset: BooleanResponse;
  editAsset: BooleanResponse;
  changeCondition: BooleanResponse;
  deleteAsset: BooleanResponse;
  addAttendance: BooleanResponse;
  editAttendance: BooleanResponse;
  addExpense: BooleanResponse;
  editExpense: BooleanResponse;
  deleteExpense: BooleanResponse;
  addSheet: BooleanResponse;
  editSheet: BooleanResponse;
  deleteSheet: BooleanResponse;
  addNote: BooleanResponse;
  editNote: BooleanResponse;
  deleteNote: BooleanResponse;
  addPayment: BooleanResponse;
  editPayment: BooleanResponse;
  deletePayment: BooleanResponse;
  addProduct: BooleanResponse;
  editProduct: BooleanResponse;
  deleteProduct: BooleanResponse;
  addPurchase: BooleanResponse;
  editPurchase: BooleanResponse;
  deletePurchase: BooleanResponse;
  addRole: BooleanResponse;
  editRole: BooleanResponse;
  deleteRole: BooleanResponse;
  addROR: BooleanResponse;
  editROR: BooleanResponse;
  deleteROR: BooleanResponse;
  addSale: BooleanResponse;
  editSale: BooleanResponse;
  deleteSale: BooleanResponse;
  addRegion: BooleanResponse;
  editRegion: BooleanResponse;
  deleteRegion: BooleanResponse;
};


export type MutationAddBranchArgs = {
  args: BranchInput;
};


export type MutationEditBranchArgs = {
  args: BranchInput;
  id: Scalars['Float'];
};


export type MutationDeleteBranchArgs = {
  id: Scalars['Float'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  token: Scalars['String'];
  newPassword: Scalars['String'];
};


export type MutationRegisterArgs = {
  params: RegisterArgs;
};


export type MutationLoginArgs = {
  params: EmailPasswordArgs;
};


export type MutationAddAccountArgs = {
  args: AccountInput;
};


export type MutationEditAccountArgs = {
  args: AccountInput;
  id: Scalars['Float'];
};


export type MutationChangeAmmountArgs = {
  ammount: Scalars['Float'];
  id: Scalars['Float'];
};


export type MutationDeleteAccountArgs = {
  id: Scalars['Float'];
};


export type MutationAddAssetArgs = {
  args: AssetInput;
};


export type MutationEditAssetArgs = {
  args: AssetInput;
  id: Scalars['Float'];
};


export type MutationChangeConditionArgs = {
  condition: Scalars['String'];
  id: Scalars['Float'];
};


export type MutationDeleteAssetArgs = {
  id: Scalars['Float'];
};


export type MutationAddAttendanceArgs = {
  attendees: Array<AttendanceInput>;
};


export type MutationEditAttendanceArgs = {
  args: AttendanceInputEdit;
  id: Scalars['Float'];
};


export type MutationAddExpenseArgs = {
  args: ExpenseInput;
};


export type MutationEditExpenseArgs = {
  args: ExpenseInput;
  id: Scalars['Float'];
};


export type MutationDeleteExpenseArgs = {
  id: Scalars['Float'];
};


export type MutationAddSheetArgs = {
  args: SheetInput;
};


export type MutationEditSheetArgs = {
  args: SheetInput;
  sheetNo: Scalars['Float'];
};


export type MutationDeleteSheetArgs = {
  sheetNo: Scalars['Float'];
};


export type MutationAddNoteArgs = {
  args: NoteInput;
};


export type MutationEditNoteArgs = {
  args: NoteInput;
  id: Scalars['Float'];
};


export type MutationDeleteNoteArgs = {
  id: Scalars['Float'];
};


export type MutationAddPaymentArgs = {
  args: PaymentInput;
};


export type MutationEditPaymentArgs = {
  args: PaymentInput;
  id: Scalars['Float'];
};


export type MutationDeletePaymentArgs = {
  id: Scalars['Float'];
};


export type MutationAddProductArgs = {
  args: ProductInput;
};


export type MutationEditProductArgs = {
  args: ProductInput;
  id: Scalars['Float'];
};


export type MutationDeleteProductArgs = {
  id: Scalars['Float'];
};


export type MutationAddPurchaseArgs = {
  args: PurchaseInput;
};


export type MutationEditPurchaseArgs = {
  args: PurchaseInput;
  id: Scalars['Float'];
};


export type MutationDeletePurchaseArgs = {
  id: Scalars['Float'];
};


export type MutationAddRoleArgs = {
  name: Scalars['String'];
};


export type MutationEditRoleArgs = {
  name: Scalars['String'];
  id: Scalars['Float'];
};


export type MutationDeleteRoleArgs = {
  id: Scalars['Float'];
};


export type MutationAddRorArgs = {
  args: RorInput;
};


export type MutationEditRorArgs = {
  args: RorInput;
  id: Scalars['Float'];
};


export type MutationDeleteRorArgs = {
  id: Scalars['Float'];
};


export type MutationAddSaleArgs = {
  args: SaleInput;
};


export type MutationEditSaleArgs = {
  args: SaleInput;
  id: Scalars['Float'];
};


export type MutationDeleteSaleArgs = {
  id: Scalars['Float'];
};


export type MutationAddRegionArgs = {
  name: Scalars['String'];
};


export type MutationEditRegionArgs = {
  name: Scalars['String'];
  id: Scalars['Float'];
};


export type MutationDeleteRegionArgs = {
  id: Scalars['Float'];
};

export type BooleanResponse = {
  __typename?: 'BooleanResponse';
  status: Scalars['Boolean'];
  error?: Maybe<FieldError>;
};

export type FieldError = {
  __typename?: 'FieldError';
  target: Scalars['String'];
  message: Scalars['String'];
};

export type BranchInput = {
  name: Scalars['String'];
  phone: Scalars['String'];
  regionId: Scalars['Float'];
  street: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  error?: Maybe<FieldError>;
  user?: Maybe<User>;
};

export type RegisterArgs = {
  name: Scalars['String'];
  email: Scalars['String'];
  phone: Scalars['String'];
  location: Scalars['String'];
  maxCredit: Scalars['Float'];
  creditDays: Scalars['Float'];
  credit: Scalars['Boolean'];
  employee: Scalars['Boolean'];
  balance: Scalars['Float'];
  salary: Scalars['Float'];
  roleId: Scalars['Float'];
  branchId: Scalars['Float'];
  password: Scalars['String'];
};

export type EmailPasswordArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type AccountInput = {
  name: Scalars['String'];
  number: Scalars['String'];
  branchId: Scalars['Float'];
  balance: Scalars['Float'];
};

export type AssetInput = {
  name: Scalars['String'];
  code: Scalars['String'];
  condition: Scalars['String'];
  details: Scalars['String'];
  branchId: Scalars['Float'];
};

export type AttendanceInput = {
  arrivedAt: Scalars['String'];
  attended: Scalars['Boolean'];
  attendeeId: Scalars['Float'];
  comment: Scalars['String'];
};

export type AttendanceInputEdit = {
  arrivedAt: Scalars['String'];
  attended: Scalars['Boolean'];
  comment: Scalars['String'];
};

export type ExpenseInput = {
  expenseDate: Scalars['String'];
  title: Scalars['String'];
  details: Scalars['String'];
  authorizerId: Scalars['Float'];
  staffId: Scalars['Float'];
  assetId: Scalars['Float'];
  ammount: Scalars['Float'];
  accountId: Scalars['Float'];
  type: Scalars['String'];
};

export type SheetInput = {
  name: Scalars['String'];
  state: Scalars['String'];
  startDate: Scalars['DateTime'];
  endDate: Scalars['DateTime'];
  staff: Array<Scalars['Int']>;
  productsIncentives: Array<IncentiveInput>;
};

export type IncentiveInput = {
  productId: Scalars['Float'];
  incentivePrice: Scalars['Float'];
};

export type NoteInput = {
  title: Scalars['String'];
  details: Scalars['String'];
};

export type PaymentInput = {
  paymentDate: Scalars['String'];
  details: Scalars['String'];
  payerId: Scalars['Float'];
  collectorId: Scalars['Float'];
  ammount: Scalars['Float'];
  accountId: Scalars['Float'];
};

export type ProductInput = {
  name: Scalars['String'];
  unit: Scalars['String'];
  pieces: Scalars['Float'];
  pieceUnit: Scalars['String'];
};

export type PurchaseInput = {
  purchaseDate: Scalars['String'];
  supplierId: Scalars['Float'];
  productId: Scalars['Float'];
  quantity: Scalars['Float'];
  purchasePrice: Scalars['Float'];
  sellingPrice: Scalars['Float'];
  pieceSellingPrice: Scalars['Float'];
  receipt: Scalars['String'];
  accountId: Scalars['Float'];
};

export type RorInput = {
  name: Scalars['String'];
  buying: Scalars['Float'];
  pieces?: Maybe<Scalars['Float']>;
  selling: Scalars['Float'];
};

export type SaleInput = {
  saleDate: Scalars['String'];
  sellerId: Scalars['Float'];
  clientId: Scalars['Float'];
  productId: Scalars['Float'];
  quantity: Scalars['Float'];
  pieceQuantity: Scalars['Float'];
  sellingPrice: Scalars['Float'];
  pieceSellingPrice: Scalars['Float'];
  payed: Scalars['Float'];
  accountId: Scalars['Float'];
};

export type ErrorFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'target' | 'message'>
);

export type MeFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'name' | 'email' | 'phone' | 'location'>
  & { role: (
    { __typename?: 'Role' }
    & Pick<Role, 'id' | 'name'>
  ), branch: (
    { __typename?: 'Branch' }
    & Pick<Branch, 'id' | 'name'>
  ) }
);

export type BooleanResponseFragment = (
  { __typename?: 'BooleanResponse' }
  & Pick<BooleanResponse, 'status'>
  & { error?: Maybe<(
    { __typename?: 'FieldError' }
    & Pick<FieldError, 'target' | 'message'>
  )> }
);

export type AddAccountMutationVariables = Exact<{
  args: AccountInput;
}>;


export type AddAccountMutation = (
  { __typename?: 'Mutation' }
  & { addAccount: (
    { __typename?: 'BooleanResponse' }
    & BooleanResponseFragment
  ) }
);

export type EditAccountMutationVariables = Exact<{
  args: AccountInput;
  id: Scalars['Float'];
}>;


export type EditAccountMutation = (
  { __typename?: 'Mutation' }
  & { editAccount: (
    { __typename?: 'BooleanResponse' }
    & BooleanResponseFragment
  ) }
);

export type DeleteAccountMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type DeleteAccountMutation = (
  { __typename?: 'Mutation' }
  & { deleteAccount: (
    { __typename?: 'BooleanResponse' }
    & BooleanResponseFragment
  ) }
);

export type AddAssetMutationVariables = Exact<{
  args: AssetInput;
}>;


export type AddAssetMutation = (
  { __typename?: 'Mutation' }
  & { addAsset: (
    { __typename?: 'BooleanResponse' }
    & BooleanResponseFragment
  ) }
);

export type EditAssetMutationVariables = Exact<{
  args: AssetInput;
  id: Scalars['Float'];
}>;


export type EditAssetMutation = (
  { __typename?: 'Mutation' }
  & { editAsset: (
    { __typename?: 'BooleanResponse' }
    & BooleanResponseFragment
  ) }
);

export type DeleteAssetMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type DeleteAssetMutation = (
  { __typename?: 'Mutation' }
  & { deleteAsset: (
    { __typename?: 'BooleanResponse' }
    & BooleanResponseFragment
  ) }
);

export type AddBranchMutationVariables = Exact<{
  args: BranchInput;
}>;


export type AddBranchMutation = (
  { __typename?: 'Mutation' }
  & { addBranch: (
    { __typename?: 'BooleanResponse' }
    & BooleanResponseFragment
  ) }
);

export type EditBranchMutationVariables = Exact<{
  args: BranchInput;
  id: Scalars['Float'];
}>;


export type EditBranchMutation = (
  { __typename?: 'Mutation' }
  & { editBranch: (
    { __typename?: 'BooleanResponse' }
    & BooleanResponseFragment
  ) }
);

export type DeleteBranchMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type DeleteBranchMutation = (
  { __typename?: 'Mutation' }
  & { deleteBranch: (
    { __typename?: 'BooleanResponse' }
    & BooleanResponseFragment
  ) }
);

export type AddRegionMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type AddRegionMutation = (
  { __typename?: 'Mutation' }
  & { addRegion: (
    { __typename?: 'BooleanResponse' }
    & BooleanResponseFragment
  ) }
);

export type EditRegionMutationVariables = Exact<{
  name: Scalars['String'];
  id: Scalars['Float'];
}>;


export type EditRegionMutation = (
  { __typename?: 'Mutation' }
  & { editRegion: (
    { __typename?: 'BooleanResponse' }
    & BooleanResponseFragment
  ) }
);

export type DeleteRegionMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type DeleteRegionMutation = (
  { __typename?: 'Mutation' }
  & { deleteRegion: (
    { __typename?: 'BooleanResponse' }
    & BooleanResponseFragment
  ) }
);

export type AddRoleMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type AddRoleMutation = (
  { __typename?: 'Mutation' }
  & { addRole: (
    { __typename?: 'BooleanResponse' }
    & BooleanResponseFragment
  ) }
);

export type EditRoleMutationVariables = Exact<{
  name: Scalars['String'];
  id: Scalars['Float'];
}>;


export type EditRoleMutation = (
  { __typename?: 'Mutation' }
  & { editRole: (
    { __typename?: 'BooleanResponse' }
    & BooleanResponseFragment
  ) }
);

export type DeleteRoleMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type DeleteRoleMutation = (
  { __typename?: 'Mutation' }
  & { deleteRole: (
    { __typename?: 'BooleanResponse' }
    & BooleanResponseFragment
  ) }
);

export type AddRorMutationVariables = Exact<{
  args: RorInput;
}>;


export type AddRorMutation = (
  { __typename?: 'Mutation' }
  & { addROR: (
    { __typename?: 'BooleanResponse' }
    & BooleanResponseFragment
  ) }
);

export type EditRorMutationVariables = Exact<{
  id: Scalars['Float'];
  args: RorInput;
}>;


export type EditRorMutation = (
  { __typename?: 'Mutation' }
  & { editROR: (
    { __typename?: 'BooleanResponse' }
    & BooleanResponseFragment
  ) }
);

export type DeleteRorMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type DeleteRorMutation = (
  { __typename?: 'Mutation' }
  & { deleteROR: (
    { __typename?: 'BooleanResponse' }
    & BooleanResponseFragment
  ) }
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & { forgotPassword: (
    { __typename?: 'BooleanResponse' }
    & BooleanResponseFragment
  ) }
);

export type LoginMutationVariables = Exact<{
  params: EmailPasswordArgs;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & MeFragment
    )>, error?: Maybe<(
      { __typename?: 'FieldError' }
      & ErrorFragment
    )> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type ResetPasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ResetPasswordMutation = (
  { __typename?: 'Mutation' }
  & { resetPassword: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & MeFragment
    )>, error?: Maybe<(
      { __typename?: 'FieldError' }
      & ErrorFragment
    )> }
  ) }
);

export type GetAccountsQueryVariables = Exact<{
  branch?: Maybe<Scalars['Float']>;
}>;


export type GetAccountsQuery = (
  { __typename?: 'Query' }
  & { getAccounts: Array<(
    { __typename?: 'Account' }
    & Pick<Account, 'id' | 'name' | 'number' | 'balance'>
    & { branch: (
      { __typename?: 'Branch' }
      & Pick<Branch, 'id' | 'name'>
    ) }
  )> }
);

export type GetAssetsQueryVariables = Exact<{
  branch?: Maybe<Scalars['Float']>;
}>;


export type GetAssetsQuery = (
  { __typename?: 'Query' }
  & { getAssets: Array<(
    { __typename?: 'Asset' }
    & Pick<Asset, 'id' | 'name' | 'code' | 'condition' | 'details'>
    & { branch: (
      { __typename?: 'Branch' }
      & Pick<Branch, 'id' | 'name'>
    ), receivedExpenses: Array<(
      { __typename?: 'Expense' }
      & Pick<Expense, 'ammount'>
    )> }
  )> }
);

export type GetBranchesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBranchesQuery = (
  { __typename?: 'Query' }
  & { getBranches: Array<(
    { __typename?: 'Branch' }
    & Pick<Branch, 'id' | 'name' | 'phone' | 'street'>
    & { region: (
      { __typename?: 'Region' }
      & Pick<Region, 'id' | 'name'>
    ) }
  )> }
);

export type GetRorsQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type GetRorsQuery = (
  { __typename?: 'Query' }
  & { getRORs: Array<(
    { __typename?: 'ROR' }
    & Pick<Ror, 'id' | 'name' | 'buying' | 'pieces' | 'selling'>
  )> }
);

export type GetRegionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRegionsQuery = (
  { __typename?: 'Query' }
  & { getRegions: Array<(
    { __typename?: 'Region' }
    & Pick<Region, 'id' | 'name'>
  )> }
);

export type GetRolesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRolesQuery = (
  { __typename?: 'Query' }
  & { getRoles: Array<(
    { __typename?: 'Role' }
    & Pick<Role, 'id' | 'name'>
  )> }
);

export type GetUsersQueryVariables = Exact<{
  employee?: Maybe<Scalars['Boolean']>;
}>;


export type GetUsersQuery = (
  { __typename?: 'Query' }
  & { getUsers: Array<(
    { __typename?: 'User' }
    & Pick<User, 'maxCredit' | 'creditDays' | 'credit' | 'balance' | 'salary'>
    & MeFragment
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & MeFragment
  )> }
);

export const ErrorFragmentDoc = gql`
    fragment Error on FieldError {
  target
  message
}
    `;
export const MeFragmentDoc = gql`
    fragment Me on User {
  id
  name
  email
  phone
  location
  role {
    id
    name
  }
  branch {
    id
    name
  }
}
    `;
export const BooleanResponseFragmentDoc = gql`
    fragment BooleanResponse on BooleanResponse {
  status
  error {
    target
    message
  }
}
    `;
export const AddAccountDocument = gql`
    mutation addAccount($args: AccountInput!) {
  addAccount(args: $args) {
    ...BooleanResponse
  }
}
    ${BooleanResponseFragmentDoc}`;

export function useAddAccountMutation() {
  return Urql.useMutation<AddAccountMutation, AddAccountMutationVariables>(AddAccountDocument);
};
export const EditAccountDocument = gql`
    mutation editAccount($args: AccountInput!, $id: Float!) {
  editAccount(args: $args, id: $id) {
    ...BooleanResponse
  }
}
    ${BooleanResponseFragmentDoc}`;

export function useEditAccountMutation() {
  return Urql.useMutation<EditAccountMutation, EditAccountMutationVariables>(EditAccountDocument);
};
export const DeleteAccountDocument = gql`
    mutation deleteAccount($id: Float!) {
  deleteAccount(id: $id) {
    ...BooleanResponse
  }
}
    ${BooleanResponseFragmentDoc}`;

export function useDeleteAccountMutation() {
  return Urql.useMutation<DeleteAccountMutation, DeleteAccountMutationVariables>(DeleteAccountDocument);
};
export const AddAssetDocument = gql`
    mutation addAsset($args: AssetInput!) {
  addAsset(args: $args) {
    ...BooleanResponse
  }
}
    ${BooleanResponseFragmentDoc}`;

export function useAddAssetMutation() {
  return Urql.useMutation<AddAssetMutation, AddAssetMutationVariables>(AddAssetDocument);
};
export const EditAssetDocument = gql`
    mutation editAsset($args: AssetInput!, $id: Float!) {
  editAsset(args: $args, id: $id) {
    ...BooleanResponse
  }
}
    ${BooleanResponseFragmentDoc}`;

export function useEditAssetMutation() {
  return Urql.useMutation<EditAssetMutation, EditAssetMutationVariables>(EditAssetDocument);
};
export const DeleteAssetDocument = gql`
    mutation deleteAsset($id: Float!) {
  deleteAsset(id: $id) {
    ...BooleanResponse
  }
}
    ${BooleanResponseFragmentDoc}`;

export function useDeleteAssetMutation() {
  return Urql.useMutation<DeleteAssetMutation, DeleteAssetMutationVariables>(DeleteAssetDocument);
};
export const AddBranchDocument = gql`
    mutation addBranch($args: BranchInput!) {
  addBranch(args: $args) {
    ...BooleanResponse
  }
}
    ${BooleanResponseFragmentDoc}`;

export function useAddBranchMutation() {
  return Urql.useMutation<AddBranchMutation, AddBranchMutationVariables>(AddBranchDocument);
};
export const EditBranchDocument = gql`
    mutation editBranch($args: BranchInput!, $id: Float!) {
  editBranch(args: $args, id: $id) {
    ...BooleanResponse
  }
}
    ${BooleanResponseFragmentDoc}`;

export function useEditBranchMutation() {
  return Urql.useMutation<EditBranchMutation, EditBranchMutationVariables>(EditBranchDocument);
};
export const DeleteBranchDocument = gql`
    mutation deleteBranch($id: Float!) {
  deleteBranch(id: $id) {
    ...BooleanResponse
  }
}
    ${BooleanResponseFragmentDoc}`;

export function useDeleteBranchMutation() {
  return Urql.useMutation<DeleteBranchMutation, DeleteBranchMutationVariables>(DeleteBranchDocument);
};
export const AddRegionDocument = gql`
    mutation addRegion($name: String!) {
  addRegion(name: $name) {
    ...BooleanResponse
  }
}
    ${BooleanResponseFragmentDoc}`;

export function useAddRegionMutation() {
  return Urql.useMutation<AddRegionMutation, AddRegionMutationVariables>(AddRegionDocument);
};
export const EditRegionDocument = gql`
    mutation editRegion($name: String!, $id: Float!) {
  editRegion(name: $name, id: $id) {
    ...BooleanResponse
  }
}
    ${BooleanResponseFragmentDoc}`;

export function useEditRegionMutation() {
  return Urql.useMutation<EditRegionMutation, EditRegionMutationVariables>(EditRegionDocument);
};
export const DeleteRegionDocument = gql`
    mutation deleteRegion($id: Float!) {
  deleteRegion(id: $id) {
    ...BooleanResponse
  }
}
    ${BooleanResponseFragmentDoc}`;

export function useDeleteRegionMutation() {
  return Urql.useMutation<DeleteRegionMutation, DeleteRegionMutationVariables>(DeleteRegionDocument);
};
export const AddRoleDocument = gql`
    mutation addRole($name: String!) {
  addRole(name: $name) {
    ...BooleanResponse
  }
}
    ${BooleanResponseFragmentDoc}`;

export function useAddRoleMutation() {
  return Urql.useMutation<AddRoleMutation, AddRoleMutationVariables>(AddRoleDocument);
};
export const EditRoleDocument = gql`
    mutation editRole($name: String!, $id: Float!) {
  editRole(name: $name, id: $id) {
    ...BooleanResponse
  }
}
    ${BooleanResponseFragmentDoc}`;

export function useEditRoleMutation() {
  return Urql.useMutation<EditRoleMutation, EditRoleMutationVariables>(EditRoleDocument);
};
export const DeleteRoleDocument = gql`
    mutation deleteRole($id: Float!) {
  deleteRole(id: $id) {
    ...BooleanResponse
  }
}
    ${BooleanResponseFragmentDoc}`;

export function useDeleteRoleMutation() {
  return Urql.useMutation<DeleteRoleMutation, DeleteRoleMutationVariables>(DeleteRoleDocument);
};
export const AddRorDocument = gql`
    mutation addROR($args: RORInput!) {
  addROR(args: $args) {
    ...BooleanResponse
  }
}
    ${BooleanResponseFragmentDoc}`;

export function useAddRorMutation() {
  return Urql.useMutation<AddRorMutation, AddRorMutationVariables>(AddRorDocument);
};
export const EditRorDocument = gql`
    mutation editROR($id: Float!, $args: RORInput!) {
  editROR(id: $id, args: $args) {
    ...BooleanResponse
  }
}
    ${BooleanResponseFragmentDoc}`;

export function useEditRorMutation() {
  return Urql.useMutation<EditRorMutation, EditRorMutationVariables>(EditRorDocument);
};
export const DeleteRorDocument = gql`
    mutation deleteROR($id: Float!) {
  deleteROR(id: $id) {
    ...BooleanResponse
  }
}
    ${BooleanResponseFragmentDoc}`;

export function useDeleteRorMutation() {
  return Urql.useMutation<DeleteRorMutation, DeleteRorMutationVariables>(DeleteRorDocument);
};
export const ForgotPasswordDocument = gql`
    mutation forgotPassword($email: String!) {
  forgotPassword(email: $email) {
    ...BooleanResponse
  }
}
    ${BooleanResponseFragmentDoc}`;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
};
export const LoginDocument = gql`
    mutation Login($params: EmailPasswordArgs!) {
  login(params: $params) {
    user {
      ...Me
    }
    error {
      ...Error
    }
  }
}
    ${MeFragmentDoc}
${ErrorFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const ResetPasswordDocument = gql`
    mutation resetPassword($token: String!, $newPassword: String!) {
  resetPassword(token: $token, newPassword: $newPassword) {
    user {
      ...Me
    }
    error {
      ...Error
    }
  }
}
    ${MeFragmentDoc}
${ErrorFragmentDoc}`;

export function useResetPasswordMutation() {
  return Urql.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument);
};
export const GetAccountsDocument = gql`
    query getAccounts($branch: Float) {
  getAccounts(branch: $branch) {
    id
    name
    branch {
      id
      name
    }
    number
    balance
  }
}
    `;

export function useGetAccountsQuery(options: Omit<Urql.UseQueryArgs<GetAccountsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetAccountsQuery>({ query: GetAccountsDocument, ...options });
};
export const GetAssetsDocument = gql`
    query getAssets($branch: Float) {
  getAssets(branch: $branch) {
    id
    name
    code
    condition
    details
    branch {
      id
      name
    }
    receivedExpenses {
      ammount
    }
  }
}
    `;

export function useGetAssetsQuery(options: Omit<Urql.UseQueryArgs<GetAssetsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetAssetsQuery>({ query: GetAssetsDocument, ...options });
};
export const GetBranchesDocument = gql`
    query getBranches {
  getBranches {
    id
    name
    phone
    region {
      id
      name
    }
    street
  }
}
    `;

export function useGetBranchesQuery(options: Omit<Urql.UseQueryArgs<GetBranchesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetBranchesQuery>({ query: GetBranchesDocument, ...options });
};
export const GetRorsDocument = gql`
    query getRORS($id: Float!) {
  getRORs(id: $id) {
    id
    name
    buying
    pieces
    selling
  }
}
    `;

export function useGetRorsQuery(options: Omit<Urql.UseQueryArgs<GetRorsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetRorsQuery>({ query: GetRorsDocument, ...options });
};
export const GetRegionsDocument = gql`
    query getRegions {
  getRegions {
    id
    name
  }
}
    `;

export function useGetRegionsQuery(options: Omit<Urql.UseQueryArgs<GetRegionsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetRegionsQuery>({ query: GetRegionsDocument, ...options });
};
export const GetRolesDocument = gql`
    query getRoles {
  getRoles {
    id
    name
  }
}
    `;

export function useGetRolesQuery(options: Omit<Urql.UseQueryArgs<GetRolesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetRolesQuery>({ query: GetRolesDocument, ...options });
};
export const GetUsersDocument = gql`
    query getUsers($employee: Boolean) {
  getUsers(employee: $employee) {
    ...Me
    maxCredit
    creditDays
    credit
    balance
    salary
  }
}
    ${MeFragmentDoc}`;

export function useGetUsersQuery(options: Omit<Urql.UseQueryArgs<GetUsersQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetUsersQuery>({ query: GetUsersDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    ...Me
  }
}
    ${MeFragmentDoc}`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};