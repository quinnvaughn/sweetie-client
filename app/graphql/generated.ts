import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: string; output: string; }
  DateTime: { input: string; output: string; }
  JSON: { input: any; output: any; }
};

export type Address = {
  __typename: 'Address';
  city: City;
  coordinates: Coordinates;
  formattedAddress: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  postalCode: Scalars['String']['output'];
  street: Scalars['String']['output'];
};

export type AdminFreeDatesPayload = AdminFreeDatesResult | AuthError | Error;

export type AdminFreeDatesResult = {
  __typename: 'AdminFreeDatesResult';
  data: Array<FreeDate>;
};

export type AlreadyLoggedInError = BaseError & {
  __typename: 'AlreadyLoggedInError';
  message: Scalars['String']['output'];
};

export type ArchiveFreeDateInput = {
  id: Scalars['String']['input'];
};

export type ArchiveFreeDatePayload = AuthError | Error | FreeDate;

export type AuthError = BaseError & {
  __typename: 'AuthError';
  message: Scalars['String']['output'];
};

export type BaseError = {
  message: Scalars['String']['output'];
};

export type CategorizedDateList = {
  __typename: 'CategorizedDateList';
  dates: Array<FreeDate>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  order: Scalars['Int']['output'];
  title: Scalars['String']['output'];
};

export type City = {
  __typename: 'City';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  nameAndState: Scalars['String']['output'];
};

export type CityConnection = {
  __typename: 'CityConnection';
  edges: Array<CityEdge>;
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type CityEdge = {
  __typename: 'CityEdge';
  cursor: Scalars['String']['output'];
  node: City;
};

export type Coordinates = {
  __typename: 'Coordinates';
  id: Scalars['ID']['output'];
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
};

export type Country = {
  __typename: 'Country';
  id: Scalars['ID']['output'];
  initials: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type CreateCategorizedDateListInput = {
  dateIds: Array<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  order: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};

export type CreateCategorizedDateListPayload = AuthError | CategorizedDateList | Error;

export type CreateDateItineraryInput = {
  date: Scalars['DateTime']['input'];
  freeDateId: Scalars['String']['input'];
  guest?: InputMaybe<GuestInput>;
  selectedOptionIds: Array<Scalars['String']['input']>;
  timeZone: Scalars['String']['input'];
  user?: InputMaybe<UserInput>;
};

export type CreateDateItineraryPayload = AuthError | Error | FieldErrors | PlannedDate;

export type CreateFreeDateInput = {
  description: Scalars['String']['input'];
  draftId?: InputMaybe<Scalars['String']['input']>;
  nsfw: Scalars['Boolean']['input'];
  orderedStops: Array<CreateOrderedDateStopInput>;
  prep?: InputMaybe<Array<Scalars['String']['input']>>;
  recommendedTime: Scalars['String']['input'];
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  thumbnail: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type CreateFreeDatePayload = AuthError | Error | FieldErrors | FreeDate;

export type CreateGroupDateAddOnInput = {
  description: Scalars['String']['input'];
  image: Scalars['String']['input'];
  maximumPrice: Scalars['Int']['input'];
  minimumPrice: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  order: Scalars['Int']['input'];
};

export type CreateGroupDateInput = {
  addOns?: InputMaybe<Array<CreateGroupDateAddOnInput>>;
  description: Scalars['String']['input'];
  image: Scalars['String']['input'];
  maximumPrice: Scalars['Int']['input'];
  minimumPrice: Scalars['Int']['input'];
  numSpots: Scalars['Int']['input'];
  products: Array<CreateGroupDateProductInput>;
  stops: Array<CreateGroupDateOrderedStopInput>;
  title: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type CreateGroupDateOrderedStopInput = {
  description: Scalars['String']['input'];
  locationId: Scalars['String']['input'];
  order: Scalars['Int']['input'];
};

export type CreateGroupDateProductInput = {
  description: Scalars['String']['input'];
  image: Scalars['String']['input'];
  name: Scalars['String']['input'];
  order: Scalars['Int']['input'];
};

export type CreateLocationInput = {
  address: CreateOrConnectAddressInput;
  name: Scalars['String']['input'];
  type: Scalars['String']['input'];
  website?: InputMaybe<Scalars['String']['input']>;
};

export type CreateLocationPayload = AuthError | Error | FieldErrors | Location;

export type CreateOrConnectAddressInput = {
  city: Scalars['String']['input'];
  postalCode: Scalars['String']['input'];
  state: Scalars['String']['input'];
  street: Scalars['String']['input'];
};

export type CreateOrderedDateStopInput = {
  estimatedTime: Scalars['Int']['input'];
  optional: Scalars['Boolean']['input'];
  options: Array<DateStopOptionInput>;
  order: Scalars['Int']['input'];
};

export type CreateRoleInput = {
  name: Scalars['String']['input'];
};

export type CreateRolePayload = AuthError | Error | Role;

export type CreateTastemakerProfileInput = {
  doesNotDo?: InputMaybe<TastemakerPreferenceInput>;
  maxNumStops?: InputMaybe<Scalars['Int']['input']>;
  minNumStops?: InputMaybe<Scalars['Int']['input']>;
  price: Scalars['Int']['input'];
  specializesIn?: InputMaybe<TastemakerPreferenceInput>;
};

export type CreateTastemakerProfilePayload = AuthError | Error | FieldErrors | Tastemaker;

export type DateCreator = {
  __typename: 'DateCreator';
  lastCreatedDate: Scalars['DateTime']['output'];
  numFreeDates: Scalars['Int']['output'];
  tastemaker: Tastemaker;
};

export type DateCreatorsPayload = AuthError | DateCreatorsResult | Error;

export type DateCreatorsResult = {
  __typename: 'DateCreatorsResult';
  averageNumOfFreeDates: Scalars['Float']['output'];
  creators: Array<DateCreator>;
};

export type DateStopOption = {
  __typename: 'DateStopOption';
  content: Scalars['String']['output'];
  hasNextOption: Scalars['Boolean']['output'];
  hasPreviousOption: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  location: Location;
  optionOrder: Scalars['Int']['output'];
  showOptions: Scalars['Boolean']['output'];
  title: Scalars['String']['output'];
  travel?: Maybe<Array<Travel>>;
};

export type DateStopOptionDraft = {
  __typename: 'DateStopOptionDraft';
  content?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  location?: Maybe<Location>;
  optionOrder: Scalars['Int']['output'];
  title?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type DateStopOptionInput = {
  content: Scalars['String']['input'];
  location: DateStopOptionLocationInput;
  optionOrder: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};

export type DateStopOptionLocationInput = {
  id: Scalars['String']['input'];
};

export type DateStopOptionUpdateInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<DateStopOptionLocationInput>;
  optionOrder?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type DateSuggestion = {
  __typename: 'DateSuggestion';
  cities: Array<City>;
  id: Scalars['ID']['output'];
  text: Scalars['String']['output'];
};

export type DefaultGuest = {
  __typename: 'DefaultGuest';
  email: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
};

export type DeleteFreeDateDraftInput = {
  id: Scalars['String']['input'];
};

export type DeleteFreeDateDraftPayload = AuthError | Error | FreeDateDraft;

export type DeleteImageInput = {
  filename: Scalars['String']['input'];
  folder: Scalars['String']['input'];
};

export type DeleteImagePayload = AuthError | DeleteImageResult | Error;

export type DeleteImageResult = {
  __typename: 'DeleteImageResult';
  data: Scalars['Boolean']['output'];
};

export type Error = BaseError & {
  __typename: 'Error';
  message: Scalars['String']['output'];
};

export type Favorite = {
  __typename: 'Favorite';
  freeDate: FreeDate;
  user: User;
};

export type FieldError = {
  __typename: 'FieldError';
  field: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type FieldErrors = {
  __typename: 'FieldErrors';
  fieldErrors: Array<FieldError>;
};

export type FreeDate = {
  __typename: 'FreeDate';
  archived: Scalars['Boolean']['output'];
  cities: Array<City>;
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  estimatedTime: Scalars['String']['output'];
  exploreMore: Array<FreeDate>;
  favoriteCount: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  isUserTastemaker: Scalars['Boolean']['output'];
  nsfw: Scalars['Boolean']['output'];
  numPlannedDates: Scalars['Int']['output'];
  orderedStops: Array<OrderedDateStop>;
  prep: Array<Scalars['String']['output']>;
  recommendedTime: Scalars['String']['output'];
  tags: Array<Tag>;
  tastemaker: Tastemaker;
  thumbnail: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  variations: Array<FreeDateVariation>;
  viewerAuthorizedGoogleCalendar: Scalars['Boolean']['output'];
  viewerFavorited: Scalars['Boolean']['output'];
  views?: Maybe<FreeDateViews>;
};

export type FreeDateConnection = {
  __typename: 'FreeDateConnection';
  edges: Array<FreeDateEdge>;
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type FreeDateDraft = {
  __typename: 'FreeDateDraft';
  author: User;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  nsfw: Scalars['Boolean']['output'];
  orderedStops: Array<OrderedDateStopDraft>;
  prep: Array<Scalars['String']['output']>;
  recommendedTime?: Maybe<Scalars['String']['output']>;
  tags: Array<Tag>;
  thumbnail?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type FreeDateDraftPayload = AuthError | Error | FreeDateDraft;

export type FreeDateDraftsPayload = AuthError | Error | FreeDateDraftsResult;

export type FreeDateDraftsResult = {
  __typename: 'FreeDateDraftsResult';
  drafts: Array<FreeDateDraft>;
};

export type FreeDateEdge = {
  __typename: 'FreeDateEdge';
  cursor: Scalars['String']['output'];
  node: FreeDate;
};

export type FreeDatePayload = Error | FreeDate;

export type FreeDateVariation = {
  __typename: 'FreeDateVariation';
  freeDate: FreeDate;
  id: Scalars['String']['output'];
  plannedDates: Array<PlannedDate>;
  stops: Array<DateStopOption>;
};

export type FreeDateViews = {
  __typename: 'FreeDateViews';
  freeDate: FreeDate;
  id: Scalars['ID']['output'];
  lastViewedAt?: Maybe<Scalars['DateTime']['output']>;
  viewCount: Scalars['Int']['output'];
};

export type FreeDatesByCity = {
  __typename: 'FreeDatesByCity';
  city: Scalars['String']['output'];
  numFreeDates: Scalars['Int']['output'];
};

export type GeneratePresignedUrlInput = {
  contentType?: InputMaybe<Scalars['String']['input']>;
  filename: Scalars['String']['input'];
  folder: Scalars['String']['input'];
};

export type GeneratePresignedUrlPayload = AuthError | Error | GeneratePresignedUrlResult;

export type GeneratePresignedUrlResult = {
  __typename: 'GeneratePresignedUrlResult';
  data: Scalars['String']['output'];
};

export type GetEditFreeDatePayload = AuthError | Error | FreeDate;

export type GetTastemakerProfilePayload = AuthError | Error | Tastemaker;

export type GoogleLocation = {
  __typename: 'GoogleLocation';
  formattedAddress: Scalars['String']['output'];
  name: Scalars['String']['output'];
  website?: Maybe<Scalars['String']['output']>;
};

export type GroupDate = {
  __typename: 'GroupDate';
  addOns: Array<GroupDateAddOn>;
  canStillSignup: Scalars['Boolean']['output'];
  cities: Array<City>;
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['String']['output'];
  image: Scalars['String']['output'];
  lastSignupDate: Scalars['DateTime']['output'];
  maximumPrice: Scalars['Int']['output'];
  minimumPrice: Scalars['Int']['output'];
  numSpots: Scalars['Int']['output'];
  numUsersSignedUp: Scalars['Int']['output'];
  products: Array<GroupDateProduct>;
  startDate: Scalars['DateTime']['output'];
  stops: Array<GroupDateOrderedStop>;
  tastemaker: Tastemaker;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userWaitlistGroup?: Maybe<GroupDateWaitlistGroup>;
  waitlist: Array<GroupDateWaitlist>;
  waitlistGroups: Array<GroupDateWaitlistGroup>;
};

export type GroupDateAddOn = {
  __typename: 'GroupDateAddOn';
  description: Scalars['String']['output'];
  id: Scalars['String']['output'];
  image?: Maybe<Scalars['String']['output']>;
  maximumPrice: Scalars['Int']['output'];
  minimumPrice: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  order: Scalars['Int']['output'];
};

export type GroupDateOrderedStop = {
  __typename: 'GroupDateOrderedStop';
  description: Scalars['String']['output'];
  estimatedTime: Scalars['Int']['output'];
  estimatedTimeHoursMinutes: Scalars['String']['output'];
  formattedEstimatedTime: Scalars['String']['output'];
  id: Scalars['String']['output'];
  location: Location;
  order: Scalars['Int']['output'];
  travel?: Maybe<Travel>;
};

export type GroupDatePayload = Error | GroupDate;

export type GroupDateProduct = {
  __typename: 'GroupDateProduct';
  description: Scalars['String']['output'];
  id: Scalars['String']['output'];
  image: Scalars['String']['output'];
  name: Scalars['String']['output'];
  order: Scalars['Int']['output'];
};

export type GroupDateWaitlist = {
  __typename: 'GroupDateWaitlist';
  groups: Array<GroupDateWaitlistGroup>;
  id: Scalars['String']['output'];
};

export type GroupDateWaitlistGroup = {
  __typename: 'GroupDateWaitlistGroup';
  code: Scalars['String']['output'];
  id: Scalars['String']['output'];
  position: Scalars['Int']['output'];
  users: Array<User>;
};

export type GroupDateWaitlistPayload = Error | GroupDateWaitlist;

export type GuestInput = {
  email: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type HelpFindingADateInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  lookingFor: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type HelpFindingADatePayload = Error | FieldErrors | HelpFindingADateResult;

export type HelpFindingADateResult = {
  __typename: 'HelpFindingADateResult';
  data: Scalars['Boolean']['output'];
};

export type Location = {
  __typename: 'Location';
  address: Address;
  id: Scalars['ID']['output'];
  images: Array<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  website?: Maybe<Scalars['String']['output']>;
};

export type LocationConnection = {
  __typename: 'LocationConnection';
  edges: Array<LocationEdge>;
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type LocationEdge = {
  __typename: 'LocationEdge';
  cursor: Scalars['String']['output'];
  node: Location;
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LoginPayload = AlreadyLoggedInError | Error | FieldErrors | User;

export type LoginWithGoogleInput = {
  code: Scalars['String']['input'];
};

export type LoginWithGooglePayload = Error | User;

export type LogoutPayload = AuthError | Error | LogoutResult;

export type LogoutResult = {
  __typename: 'LogoutResult';
  data: Scalars['Boolean']['output'];
};

export type Mutation = {
  __typename: 'Mutation';
  archiveFreeDate: ArchiveFreeDatePayload;
  createCategorizedDateList: CreateCategorizedDateListPayload;
  createDateItinerary: CreateDateItineraryPayload;
  createFreeDate: CreateFreeDatePayload;
  createGroupDate: GroupDate;
  createLocation: CreateLocationPayload;
  createRole: CreateRolePayload;
  createTastemakerProfile: CreateTastemakerProfilePayload;
  deleteFreeDateDraft: DeleteFreeDateDraftPayload;
  deleteImage: DeleteImagePayload;
  generatePresignedUrl: GeneratePresignedUrlPayload;
  helpFindingADate: HelpFindingADatePayload;
  login: LoginPayload;
  loginWithGoogle: LoginWithGooglePayload;
  logout: LogoutPayload;
  register: RegisterPayload;
  removeDefaultGuest: RemoveDefaultGuestPayload;
  requestPasswordReset: RequestPasswordResetPayload;
  resetPassword: ResetPasswordPayload;
  restoreFreeDate: RestoreFreeDatePayload;
  saveFreeDateDraft: SaveFreeDateDraftPayload;
  setDefaultGuest: SetDefaultGuestPayload;
  signUpForWaitlist: SignUpForWaitlistPayload;
  suggestDate: SuggestDatePayload;
  toggleFavorite: ToggleFavoritePayload;
  track: Scalars['Boolean']['output'];
  updateFreeDate: UpdateFreeDatePayload;
  updatePassword: UpdatePasswordPayload;
  updateUserProfile: UpdateUserProfilePayload;
};


export type MutationArchiveFreeDateArgs = {
  input: ArchiveFreeDateInput;
};


export type MutationCreateCategorizedDateListArgs = {
  input: CreateCategorizedDateListInput;
};


export type MutationCreateDateItineraryArgs = {
  input: CreateDateItineraryInput;
};


export type MutationCreateFreeDateArgs = {
  input: CreateFreeDateInput;
};


export type MutationCreateGroupDateArgs = {
  input: CreateGroupDateInput;
};


export type MutationCreateLocationArgs = {
  input: CreateLocationInput;
};


export type MutationCreateRoleArgs = {
  input: CreateRoleInput;
};


export type MutationCreateTastemakerProfileArgs = {
  input: CreateTastemakerProfileInput;
};


export type MutationDeleteFreeDateDraftArgs = {
  input: DeleteFreeDateDraftInput;
};


export type MutationDeleteImageArgs = {
  input: DeleteImageInput;
};


export type MutationGeneratePresignedUrlArgs = {
  input: GeneratePresignedUrlInput;
};


export type MutationHelpFindingADateArgs = {
  input: HelpFindingADateInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationLoginWithGoogleArgs = {
  input: LoginWithGoogleInput;
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationRequestPasswordResetArgs = {
  input: RequestPasswordResetInput;
};


export type MutationResetPasswordArgs = {
  input: ResetPasswordInput;
};


export type MutationRestoreFreeDateArgs = {
  input: RestoreFreeDateInput;
};


export type MutationSaveFreeDateDraftArgs = {
  input: SaveFreeDateDraftInput;
};


export type MutationSetDefaultGuestArgs = {
  input: SetDefaultGuestInput;
};


export type MutationSignUpForWaitlistArgs = {
  input: SignUpForWaitlistInput;
};


export type MutationSuggestDateArgs = {
  input: SuggestDateInput;
};


export type MutationToggleFavoriteArgs = {
  input: ToggleFavoriteInput;
};


export type MutationTrackArgs = {
  input: TrackInput;
};


export type MutationUpdateFreeDateArgs = {
  input: UpdateFreeDateInput;
};


export type MutationUpdatePasswordArgs = {
  input: UpdatePasswordInput;
};


export type MutationUpdateUserProfileArgs = {
  input: UpdateUserProfileInput;
};

export type OrderedDateStop = {
  __typename: 'OrderedDateStop';
  createdAt: Scalars['DateTime']['output'];
  estimatedTime: Scalars['Int']['output'];
  estimatedTimeHoursMinutes: Scalars['String']['output'];
  formattedEstimatedTime: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  optional: Scalars['Boolean']['output'];
  options: Array<DateStopOption>;
  order: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type OrderedDateStopDraft = {
  __typename: 'OrderedDateStopDraft';
  createdAt: Scalars['DateTime']['output'];
  estimatedTime: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  optional: Scalars['Boolean']['output'];
  options: Array<DateStopOptionDraft>;
  order: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type PageInfo = {
  __typename: 'PageInfo';
  endCursor: Scalars['String']['output'];
  hasNextPage: Scalars['Boolean']['output'];
};

export type PlannedDate = {
  __typename: 'PlannedDate';
  createdAt: Scalars['DateTime']['output'];
  email?: Maybe<Scalars['String']['output']>;
  guest?: Maybe<PlannedDateGuest>;
  id: Scalars['ID']['output'];
  plannedTime: Scalars['DateTime']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user?: Maybe<User>;
  variation?: Maybe<FreeDateVariation>;
};

export type PlannedDateGuest = {
  __typename: 'PlannedDateGuest';
  email?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename: 'Query';
  adminFreeDates: AdminFreeDatesPayload;
  categorizedDateLists: Array<CategorizedDateList>;
  cities: CityConnection;
  dateCreators: DateCreatorsPayload;
  dateSuggestions: Array<DateSuggestion>;
  freeDate: FreeDatePayload;
  freeDateDraft: FreeDateDraftPayload;
  freeDateDrafts: FreeDateDraftsPayload;
  freeDates: FreeDateConnection;
  freeDatesByCity: Array<FreeDatesByCity>;
  getEditFreeDate: GetEditFreeDatePayload;
  getGoogleLocations: Array<GoogleLocation>;
  getSpecialOffer?: Maybe<SpecialOffer>;
  getTastemakerProfile: GetTastemakerProfilePayload;
  groupDate: GroupDatePayload;
  groupDateWaitlist: GroupDateWaitlistPayload;
  groupDates: Array<GroupDate>;
  locations: LocationConnection;
  tags: Array<Tag>;
  user: UserPayload;
  viewer?: Maybe<User>;
  waitlist: Array<GroupDateWaitlist>;
};


export type QueryCitiesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  selected?: InputMaybe<Array<Scalars['String']['input']>>;
  text: Scalars['String']['input'];
};


export type QueryFreeDateArgs = {
  id: Scalars['String']['input'];
};


export type QueryFreeDateDraftArgs = {
  id: Scalars['String']['input'];
};


export type QueryFreeDatesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  cities?: InputMaybe<Array<Scalars['String']['input']>>;
  first?: InputMaybe<Scalars['Int']['input']>;
  nsfw?: InputMaybe<Scalars['String']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetEditFreeDateArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetGoogleLocationsArgs = {
  text: Scalars['String']['input'];
};


export type QueryGetTastemakerProfileArgs = {
  username: Scalars['String']['input'];
};


export type QueryGroupDateArgs = {
  id: Scalars['String']['input'];
};


export type QueryGroupDateWaitlistArgs = {
  id: Scalars['String']['input'];
};


export type QueryLocationsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  text: Scalars['String']['input'];
};


export type QueryTagsArgs = {
  text?: InputMaybe<Scalars['String']['input']>;
};


export type QueryUserArgs = {
  username: Scalars['String']['input'];
};

export type RegisterInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type RegisterPayload = AlreadyLoggedInError | Error | FieldErrors | User;

export type RemoveDefaultGuestPayload = AuthError | DefaultGuest | Error;

export type RequestPasswordResetInput = {
  email: Scalars['String']['input'];
};

export type RequestPasswordResetPayload = Error | FieldErrors | RequestPasswordResetResponse;

export type RequestPasswordResetResponse = {
  __typename: 'RequestPasswordResetResponse';
  email: Scalars['String']['output'];
};

export type ResetPasswordInput = {
  password: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type ResetPasswordPayload = Error | User;

export type RestoreFreeDateInput = {
  id: Scalars['String']['input'];
};

export type RestoreFreeDatePayload = AuthError | Error | FreeDate;

export type Role = {
  __typename: 'Role';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type SaveDateStopOptionDraftInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<SaveLocationDraftInput>;
  optionOrder: Scalars['Int']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};

export type SaveFreeDateDraftInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  draftId?: InputMaybe<Scalars['String']['input']>;
  nsfw?: InputMaybe<Scalars['Boolean']['input']>;
  orderedStops?: InputMaybe<Array<SaveOrderedDateStopDraftInput>>;
  prep?: InputMaybe<Array<Scalars['String']['input']>>;
  recommendedTime?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  thumbnail?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type SaveFreeDateDraftPayload = AuthError | Error | FieldErrors | FreeDateDraft;

export type SaveLocationDraftInput = {
  id?: InputMaybe<Scalars['String']['input']>;
};

export type SaveOrderedDateStopDraftInput = {
  estimatedTime: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  optional: Scalars['Boolean']['input'];
  options?: InputMaybe<Array<SaveDateStopOptionDraftInput>>;
  order: Scalars['Int']['input'];
};

export type SetDefaultGuestInput = {
  email: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type SetDefaultGuestPayload = AuthError | DefaultGuest | Error | FieldErrors;

export type SignUpForWaitlistInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  groupDateId: Scalars['String']['input'];
};

export type SignUpForWaitlistPayload = AuthError | Error | GroupDateWaitlistGroup;

export type SpecialOffer = {
  __typename: 'SpecialOffer';
  color: Scalars['String']['output'];
  description: Scalars['String']['output'];
  icon: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
};

export type State = {
  __typename: 'State';
  id: Scalars['ID']['output'];
  initials: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type SuggestDateInput = {
  cities?: InputMaybe<Array<Scalars['String']['input']>>;
  text: Scalars['String']['input'];
};

export type SuggestDatePayload = AuthError | DateSuggestion | Error;

export type Tag = {
  __typename: 'Tag';
  drafts: Array<FreeDateDraft>;
  freeDates: Array<FreeDate>;
  id: Scalars['ID']['output'];
  text: Scalars['String']['output'];
};

export type Tastemaker = {
  __typename: 'Tastemaker';
  doesNotDo?: Maybe<TastemakerPreference>;
  formattedPrice: Scalars['String']['output'];
  freeDates: Array<FreeDate>;
  id: Scalars['ID']['output'];
  isPartiallySetup: Scalars['Boolean']['output'];
  isSetup: Scalars['Boolean']['output'];
  maxNumStops?: Maybe<Scalars['Int']['output']>;
  minNumStops: Scalars['Int']['output'];
  price: Scalars['Int']['output'];
  specializesIn?: Maybe<TastemakerPreference>;
  user: User;
};


export type TastemakerFreeDatesArgs = {
  archived?: InputMaybe<Scalars['Boolean']['input']>;
};

export type TastemakerPreference = {
  __typename: 'TastemakerPreference';
  cities: Array<City>;
  id: Scalars['ID']['output'];
  tags: Array<Tag>;
};

export type TastemakerPreferenceInput = {
  cities?: InputMaybe<Array<Scalars['String']['input']>>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type ToggleFavoriteInput = {
  freeDateId: Scalars['String']['input'];
};

export type ToggleFavoritePayload = AuthError | Error | ToggleFavoriteResult;

export type ToggleFavoriteResult = {
  __typename: 'ToggleFavoriteResult';
  type: Scalars['String']['output'];
};

export type TrackInput = {
  event: Scalars['String']['input'];
  properties?: InputMaybe<Scalars['JSON']['input']>;
};

export type Travel = {
  __typename: 'Travel';
  destinationId: Scalars['String']['output'];
  distance: Scalars['Int']['output'];
  duration: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  mode: TravelMode;
  originId: Scalars['String']['output'];
};

export enum TravelMode {
  Boat = 'BOAT',
  Car = 'CAR',
  Plane = 'PLANE',
  Train = 'TRAIN',
  Walk = 'WALK'
}

export type UpdateFreeDateInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  nsfw?: InputMaybe<Scalars['Boolean']['input']>;
  orderedStops?: InputMaybe<Array<UpdateOrderedDateStopInput>>;
  prep?: InputMaybe<Array<Scalars['String']['input']>>;
  recommendedTime?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<UpdateTagInput>>;
  thumbnail?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateFreeDatePayload = AuthError | Error | FieldErrors | FreeDate;

export type UpdateOrderedDateStopInput = {
  estimatedTime?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  optional?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<Array<DateStopOptionUpdateInput>>;
  order?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdatePasswordInput = {
  currentPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
};

export type UpdatePasswordPayload = AuthError | Error | FieldErrors | User;

export type UpdateTagInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  text: Scalars['String']['input'];
};

export type UpdateUserProfileInput = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  bio?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  link?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserProfilePayload = AuthError | Error | FieldErrors | User;

export type User = {
  __typename: 'User';
  authorizedGoogleCalendar: Scalars['Boolean']['output'];
  createdAt: Scalars['DateTime']['output'];
  defaultGuest?: Maybe<DefaultGuest>;
  drafts: Array<FreeDateDraft>;
  email: Scalars['String']['output'];
  favoritedDates: Array<FreeDate>;
  hasCreatedADate: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  isUserADateCreator: Scalars['Boolean']['output'];
  isUsersProfile: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  previousPlannedDates: Array<PlannedDate>;
  profile?: Maybe<UserProfile>;
  role: Role;
  tastemaker?: Maybe<Tastemaker>;
  upcomingPlannedDates: Array<PlannedDate>;
  updatedAt: Scalars['DateTime']['output'];
  username: Scalars['String']['output'];
};

export type UserInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type UserPayload = Error | User;

export type UserProfile = {
  __typename: 'UserProfile';
  avatar?: Maybe<Scalars['String']['output']>;
  bio?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  link?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type CategorizedDateListFragment = { __typename: 'CategorizedDateList', title: string, description?: string | null, id: string, dates: Array<{ __typename: 'FreeDate', id: string, title: string, archived: boolean, thumbnail: string, updatedAt: string, nsfw: boolean, description: string, viewerFavorited: boolean, estimatedTime: string, tastemaker: { __typename: 'Tastemaker', id: string, user: { __typename: 'User', id: string, name: string, profile?: { __typename: 'UserProfile', id: string, avatar?: string | null } | null } }, cities: Array<{ __typename: 'City', id: string, nameAndState: string }> }> };

export type DraftCardFragment = { __typename: 'FreeDateDraft', id: string, title?: string | null, thumbnail?: string | null, updatedAt: string, author: { __typename: 'User', id: string, name: string, email: string } };

export type OrderedDateStopDraftFragment = { __typename: 'OrderedDateStopDraft', id: string, order: number, estimatedTime: number, optional: boolean, options: Array<{ __typename: 'DateStopOptionDraft', id: string, optionOrder: number, title?: string | null, content?: string | null, location?: { __typename: 'Location', id: string, name: string } | null }> };

export type DateStopOptionDraftFragment = { __typename: 'DateStopOptionDraft', id: string, optionOrder: number, title?: string | null, content?: string | null, location?: { __typename: 'Location', id: string, name: string } | null };

export type FreeDateCardFragment = { __typename: 'FreeDate', id: string, title: string, archived: boolean, thumbnail: string, updatedAt: string, nsfw: boolean, description: string, viewerFavorited: boolean, estimatedTime: string, tastemaker: { __typename: 'Tastemaker', id: string, user: { __typename: 'User', id: string, name: string, profile?: { __typename: 'UserProfile', id: string, avatar?: string | null } | null } }, cities: Array<{ __typename: 'City', id: string, nameAndState: string }> };

export type GetFreeDateFragment = { __typename: 'FreeDate', id: string, title: string, description: string, thumbnail: string, archived: boolean, nsfw: boolean, createdAt: string, updatedAt: string, prep: Array<string>, isUserTastemaker: boolean, viewerFavorited: boolean, viewerAuthorizedGoogleCalendar: boolean, recommendedTime: string, cities: Array<{ __typename: 'City', id: string, nameAndState: string, name: string }>, tags: Array<{ __typename: 'Tag', id: string, text: string }>, tastemaker: { __typename: 'Tastemaker', id: string, isSetup: boolean, formattedPrice: string, user: { __typename: 'User', id: string, username: string, name: string, profile?: { __typename: 'UserProfile', id: string, avatar?: string | null } | null } }, orderedStops: Array<{ __typename: 'OrderedDateStop', id: string, order: number, formattedEstimatedTime: string, estimatedTimeHoursMinutes: string, optional: boolean, options: Array<{ __typename: 'DateStopOption', id: string, optionOrder: number, title: string, content: string, hasNextOption: boolean, hasPreviousOption: boolean, showOptions: boolean, travel?: Array<{ __typename: 'Travel', distance: number, duration: number, mode: TravelMode, destinationId: string }> | null, location: { __typename: 'Location', id: string, name: string, website?: string | null, address: { __typename: 'Address', id: string, formattedAddress: string, city: { __typename: 'City', id: string, name: string }, coordinates: { __typename: 'Coordinates', lat: number, lng: number } } } }> }>, exploreMore: Array<{ __typename: 'FreeDate', id: string, title: string, archived: boolean, thumbnail: string, updatedAt: string, nsfw: boolean, description: string, viewerFavorited: boolean, estimatedTime: string, tastemaker: { __typename: 'Tastemaker', id: string, user: { __typename: 'User', id: string, name: string, profile?: { __typename: 'UserProfile', id: string, avatar?: string | null } | null } }, cities: Array<{ __typename: 'City', id: string, nameAndState: string }> }> };

export type GroupDateAddOnFragment = { __typename: 'GroupDateAddOn', description: string, id: string, name: string, order: number, image?: string | null, minimumPrice: number, maximumPrice: number };

export type GroupDateCardFragment = { __typename: 'GroupDate', title: string, image: string, description: string, id: string, startDate: string, lastSignupDate: string, numSpots: number, numUsersSignedUp: number, tastemaker: { __typename: 'Tastemaker', id: string, isSetup: boolean, formattedPrice: string, user: { __typename: 'User', id: string, username: string, name: string, profile?: { __typename: 'UserProfile', id: string, avatar?: string | null } | null } }, cities: Array<{ __typename: 'City', id: string, nameAndState: string }> };

export type GroupDateOrderedStopFragment = { __typename: 'GroupDateOrderedStop', id: string, description: string, order: number, formattedEstimatedTime: string, travel?: { __typename: 'Travel', distance: number, duration: number, mode: TravelMode, destinationId: string } | null, location: { __typename: 'Location', images: Array<string>, id: string, name: string, website?: string | null, address: { __typename: 'Address', id: string, formattedAddress: string, city: { __typename: 'City', id: string, name: string }, coordinates: { __typename: 'Coordinates', lat: number, lng: number } } } };

export type GroupDateProductFragment = { __typename: 'GroupDateProduct', description: string, id: string, name: string, order: number, image: string };

export type GroupDateWaitlistGroupFragment = { __typename: 'GroupDateWaitlistGroup', code: string, position: number };

export type LocationInfoFragment = { __typename: 'Location', id: string, name: string, website?: string | null, address: { __typename: 'Address', id: string, formattedAddress: string, city: { __typename: 'City', id: string, name: string }, coordinates: { __typename: 'Coordinates', lat: number, lng: number } } };

export type OrderedDateStopFragment = { __typename: 'OrderedDateStop', id: string, order: number, formattedEstimatedTime: string, estimatedTimeHoursMinutes: string, optional: boolean, options: Array<{ __typename: 'DateStopOption', id: string, optionOrder: number, title: string, content: string, hasNextOption: boolean, hasPreviousOption: boolean, showOptions: boolean, travel?: Array<{ __typename: 'Travel', distance: number, duration: number, mode: TravelMode, destinationId: string }> | null, location: { __typename: 'Location', id: string, name: string, website?: string | null, address: { __typename: 'Address', id: string, formattedAddress: string, city: { __typename: 'City', id: string, name: string }, coordinates: { __typename: 'Coordinates', lat: number, lng: number } } } }> };

export type TravelItemFragment = { __typename: 'Travel', distance: number, duration: number, mode: TravelMode, destinationId: string };

export type DateStopOptionFragment = { __typename: 'DateStopOption', id: string, optionOrder: number, title: string, content: string, hasNextOption: boolean, hasPreviousOption: boolean, showOptions: boolean, travel?: Array<{ __typename: 'Travel', distance: number, duration: number, mode: TravelMode, destinationId: string }> | null, location: { __typename: 'Location', id: string, name: string, website?: string | null, address: { __typename: 'Address', id: string, formattedAddress: string, city: { __typename: 'City', id: string, name: string }, coordinates: { __typename: 'Coordinates', lat: number, lng: number } } } };

export type PlannedDateCardFragment = { __typename: 'PlannedDate', id: string, plannedTime: string, variation?: { __typename: 'FreeDateVariation', freeDate: { __typename: 'FreeDate', id: string, title: string, archived: boolean, thumbnail: string, updatedAt: string, nsfw: boolean, description: string, viewerFavorited: boolean, estimatedTime: string, tastemaker: { __typename: 'Tastemaker', id: string, user: { __typename: 'User', id: string, name: string, profile?: { __typename: 'UserProfile', id: string, avatar?: string | null } | null } }, cities: Array<{ __typename: 'City', id: string, nameAndState: string }> } } | null, guest?: { __typename: 'PlannedDateGuest', name?: string | null } | null };

export type SpecialOfferFragment = { __typename: 'SpecialOffer', id: string, title: string, description: string, icon: string, color: string };

export type TagsFragment = { __typename: 'Tag', id: string, text: string };

export type DateAnalyticsCardFragment = { __typename: 'FreeDate', id: string, title: string, thumbnail: string, numPlannedDates: number, favoriteCount: number, views?: { __typename: 'FreeDateViews', id: string, viewCount: number } | null };

export type DateSuggestionCardFragment = { __typename: 'DateSuggestion', id: string, text: string, cities: Array<{ __typename: 'City', id: string, nameAndState: string }> };

export type TastemakerInfoFragment = { __typename: 'Tastemaker', id: string, isSetup: boolean, formattedPrice: string, user: { __typename: 'User', id: string, username: string, name: string, profile?: { __typename: 'UserProfile', id: string, avatar?: string | null } | null } };

export type UserBioFragment = { __typename: 'User', id: string, profile?: { __typename: 'UserProfile', id: string, bio?: string | null } | null };

export type UserProfileHeadingFragment = { __typename: 'User', id: string, isUsersProfile: boolean, name: string, username: string, profile?: { __typename: 'UserProfile', id: string, avatar?: string | null, link?: string | null } | null };

export type UserProfileLeftSideFragment = { __typename: 'User', id: string, isUsersProfile: boolean, name: string, username: string, profile?: { __typename: 'UserProfile', id: string, avatar?: string | null, link?: string | null, bio?: string | null } | null };

export type UserProfileFragment = { __typename: 'User', id: string, isUsersProfile: boolean, name: string, username: string, tastemaker?: { __typename: 'Tastemaker', id: string, freeDates: Array<{ __typename: 'FreeDate', id: string, title: string, archived: boolean, thumbnail: string, updatedAt: string, nsfw: boolean, description: string, viewerFavorited: boolean, estimatedTime: string, tastemaker: { __typename: 'Tastemaker', id: string, user: { __typename: 'User', id: string, name: string, profile?: { __typename: 'UserProfile', id: string, avatar?: string | null } | null } }, cities: Array<{ __typename: 'City', id: string, nameAndState: string }> }> } | null, profile?: { __typename: 'UserProfile', id: string, avatar?: string | null, link?: string | null, bio?: string | null } | null };

export type LoginWithGoogleMutationVariables = Exact<{
  input: LoginWithGoogleInput;
}>;


export type LoginWithGoogleMutation = { __typename: 'Mutation', loginWithGoogle: { __typename: 'Error', message: string } | { __typename: 'User', id: string } };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename: 'Mutation', login: { __typename: 'AlreadyLoggedInError', message: string } | { __typename: 'Error' } | { __typename: 'FieldErrors', fieldErrors: Array<{ __typename: 'FieldError', message: string, field: string }> } | { __typename: 'User', id: string, email: string, name: string } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename: 'Mutation', logout: { __typename: 'AuthError', message: string } | { __typename: 'Error', message: string } | { __typename: 'LogoutResult', data: boolean } };

export type RegisterMutationVariables = Exact<{
  input: RegisterInput;
}>;


export type RegisterMutation = { __typename: 'Mutation', register: { __typename: 'AlreadyLoggedInError', message: string } | { __typename: 'Error', message: string } | { __typename: 'FieldErrors', fieldErrors: Array<{ __typename: 'FieldError', message: string, field: string }> } | { __typename: 'User', id: string, email: string, name: string } };

export type RequestPasswordResetMutationVariables = Exact<{
  input: RequestPasswordResetInput;
}>;


export type RequestPasswordResetMutation = { __typename: 'Mutation', requestPasswordReset: { __typename: 'Error', message: string } | { __typename: 'FieldErrors', fieldErrors: Array<{ __typename: 'FieldError', field: string, message: string }> } | { __typename: 'RequestPasswordResetResponse', email: string } };

export type ResetPasswordMutationVariables = Exact<{
  input: ResetPasswordInput;
}>;


export type ResetPasswordMutation = { __typename: 'Mutation', resetPassword: { __typename: 'Error', message: string } | { __typename: 'User', id: string } };

export type CreateDateItineraryMutationVariables = Exact<{
  input: CreateDateItineraryInput;
}>;


export type CreateDateItineraryMutation = { __typename: 'Mutation', createDateItinerary: { __typename: 'AuthError', message: string } | { __typename: 'Error', message: string } | { __typename: 'FieldErrors', fieldErrors: Array<{ __typename: 'FieldError', message: string, field: string }> } | { __typename: 'PlannedDate', plannedTime: string, variation?: { __typename: 'FreeDateVariation', freeDate: { __typename: 'FreeDate', title: string, tastemaker: { __typename: 'Tastemaker', user: { __typename: 'User', id: string, name: string, username: string } }, orderedStops: Array<{ __typename: 'OrderedDateStop', options: Array<{ __typename: 'DateStopOption', location: { __typename: 'Location', name: string } }> }>, cities: Array<{ __typename: 'City', name: string }> } } | null } };

export type SaveFreeDateDraftMutationVariables = Exact<{
  input: SaveFreeDateDraftInput;
}>;


export type SaveFreeDateDraftMutation = { __typename: 'Mutation', saveFreeDateDraft: { __typename: 'AuthError', message: string } | { __typename: 'Error', message: string } | { __typename: 'FieldErrors', fieldErrors: Array<{ __typename: 'FieldError', message: string, field: string }> } | { __typename: 'FreeDateDraft', id: string, title?: string | null, thumbnail?: string | null, updatedAt: string, author: { __typename: 'User', id: string, name: string, email: string } } };

export type ToggleFavoriteMutationVariables = Exact<{
  input: ToggleFavoriteInput;
}>;


export type ToggleFavoriteMutation = { __typename: 'Mutation', toggleFavorite: { __typename: 'AuthError', message: string } | { __typename: 'Error', message: string } | { __typename: 'ToggleFavoriteResult', type: string } };

export type ArchiveFreeDateMutationVariables = Exact<{
  input: ArchiveFreeDateInput;
}>;


export type ArchiveFreeDateMutation = { __typename: 'Mutation', archiveFreeDate: { __typename: 'AuthError', message: string } | { __typename: 'Error', message: string } | { __typename: 'FreeDate', id: string, title: string, archived: boolean, thumbnail: string, updatedAt: string, nsfw: boolean, description: string, viewerFavorited: boolean, estimatedTime: string, tastemaker: { __typename: 'Tastemaker', id: string, user: { __typename: 'User', id: string, name: string, profile?: { __typename: 'UserProfile', id: string, avatar?: string | null } | null } }, cities: Array<{ __typename: 'City', id: string, nameAndState: string }> } };

export type CreateFreeDateMutationVariables = Exact<{
  input: CreateFreeDateInput;
}>;


export type CreateFreeDateMutation = { __typename: 'Mutation', createFreeDate: { __typename: 'AuthError', message: string } | { __typename: 'Error', message: string } | { __typename: 'FieldErrors', fieldErrors: Array<{ __typename: 'FieldError', message: string, field: string }> } | { __typename: 'FreeDate', id: string, title: string, archived: boolean, thumbnail: string, updatedAt: string, nsfw: boolean, description: string, viewerFavorited: boolean, estimatedTime: string, tastemaker: { __typename: 'Tastemaker', id: string, user: { __typename: 'User', id: string, name: string, profile?: { __typename: 'UserProfile', id: string, avatar?: string | null } | null } }, cities: Array<{ __typename: 'City', id: string, nameAndState: string }> } };

export type HelpFindingADateMutationVariables = Exact<{
  input: HelpFindingADateInput;
}>;


export type HelpFindingADateMutation = { __typename: 'Mutation', helpFindingADate: { __typename: 'Error' } | { __typename: 'FieldErrors', fieldErrors: Array<{ __typename: 'FieldError', message: string, field: string }> } | { __typename: 'HelpFindingADateResult', data: boolean } };

export type RestoreFreeDateMutationVariables = Exact<{
  input: RestoreFreeDateInput;
}>;


export type RestoreFreeDateMutation = { __typename: 'Mutation', restoreFreeDate: { __typename: 'AuthError' } | { __typename: 'Error', message: string } | { __typename: 'FreeDate', id: string, title: string, archived: boolean, thumbnail: string, updatedAt: string, nsfw: boolean, description: string, viewerFavorited: boolean, estimatedTime: string, tastemaker: { __typename: 'Tastemaker', id: string, user: { __typename: 'User', id: string, name: string, profile?: { __typename: 'UserProfile', id: string, avatar?: string | null } | null } }, cities: Array<{ __typename: 'City', id: string, nameAndState: string }> } };

export type UpdateFreeDateMutationVariables = Exact<{
  input: UpdateFreeDateInput;
}>;


export type UpdateFreeDateMutation = { __typename: 'Mutation', updateFreeDate: { __typename: 'AuthError', message: string } | { __typename: 'Error', message: string } | { __typename: 'FieldErrors', fieldErrors: Array<{ __typename: 'FieldError', field: string, message: string }> } | { __typename: 'FreeDate', id: string, title: string, description: string, thumbnail: string, archived: boolean, nsfw: boolean, prep: Array<string>, tags: Array<{ __typename: 'Tag', id: string, text: string }>, tastemaker: { __typename: 'Tastemaker', id: string, isSetup: boolean, formattedPrice: string, user: { __typename: 'User', id: string, username: string, name: string, profile?: { __typename: 'UserProfile', id: string, avatar?: string | null } | null } }, orderedStops: Array<{ __typename: 'OrderedDateStop', id: string, order: number, formattedEstimatedTime: string, estimatedTimeHoursMinutes: string, optional: boolean, options: Array<{ __typename: 'DateStopOption', id: string, optionOrder: number, title: string, content: string, hasNextOption: boolean, hasPreviousOption: boolean, showOptions: boolean, travel?: Array<{ __typename: 'Travel', distance: number, duration: number, mode: TravelMode, destinationId: string }> | null, location: { __typename: 'Location', id: string, name: string, website?: string | null, address: { __typename: 'Address', id: string, formattedAddress: string, city: { __typename: 'City', id: string, name: string }, coordinates: { __typename: 'Coordinates', lat: number, lng: number } } } }> }> } };

export type SignUpForWaitlistMutationVariables = Exact<{
  input: SignUpForWaitlistInput;
}>;


export type SignUpForWaitlistMutation = { __typename: 'Mutation', signUpForWaitlist: { __typename: 'AuthError', message: string } | { __typename: 'Error', message: string } | { __typename: 'GroupDateWaitlistGroup', code: string, id: string, users: Array<{ __typename: 'User', id: string, name: string }> } };

export type DeleteImageMutationVariables = Exact<{
  input: DeleteImageInput;
}>;


export type DeleteImageMutation = { __typename: 'Mutation', deleteImage: { __typename: 'AuthError', message: string } | { __typename: 'DeleteImageResult', data: boolean } | { __typename: 'Error' } };

export type GeneratePresignedUrlMutationVariables = Exact<{
  input: GeneratePresignedUrlInput;
}>;


export type GeneratePresignedUrlMutation = { __typename: 'Mutation', generatePresignedUrl: { __typename: 'AuthError', message: string } | { __typename: 'Error', message: string } | { __typename: 'GeneratePresignedUrlResult', data: string } };

export type CreateLocationMutationVariables = Exact<{
  input: CreateLocationInput;
}>;


export type CreateLocationMutation = { __typename: 'Mutation', createLocation: { __typename: 'AuthError', message: string } | { __typename: 'Error', message: string } | { __typename: 'FieldErrors', fieldErrors: Array<{ __typename: 'FieldError', field: string, message: string }> } | { __typename: 'Location', id: string, name: string, address: { __typename: 'Address', id: string, formattedAddress: string } } };

export type TrackMutationVariables = Exact<{
  input: TrackInput;
}>;


export type TrackMutation = { __typename: 'Mutation', track: boolean };

export type DeleteFreeDateDraftMutationVariables = Exact<{
  input: DeleteFreeDateDraftInput;
}>;


export type DeleteFreeDateDraftMutation = { __typename: 'Mutation', deleteFreeDateDraft: { __typename: 'AuthError', message: string } | { __typename: 'Error', message: string } | { __typename: 'FreeDateDraft', id: string, title?: string | null, thumbnail?: string | null, updatedAt: string, author: { __typename: 'User', id: string, name: string, email: string } } };

export type RemoveDefaultGuestMutationVariables = Exact<{ [key: string]: never; }>;


export type RemoveDefaultGuestMutation = { __typename: 'Mutation', removeDefaultGuest: { __typename: 'AuthError', message: string } | { __typename: 'DefaultGuest', name?: string | null, email: string } | { __typename: 'Error', message: string } };

export type SetDefaultGuestMutationVariables = Exact<{
  input: SetDefaultGuestInput;
}>;


export type SetDefaultGuestMutation = { __typename: 'Mutation', setDefaultGuest: { __typename: 'AuthError', message: string } | { __typename: 'DefaultGuest', name?: string | null, email: string } | { __typename: 'Error', message: string } | { __typename: 'FieldErrors', fieldErrors: Array<{ __typename: 'FieldError', message: string, field: string }> } };

export type UpdatePasswordMutationVariables = Exact<{
  input: UpdatePasswordInput;
}>;


export type UpdatePasswordMutation = { __typename: 'Mutation', updatePassword: { __typename: 'AuthError', message: string } | { __typename: 'Error', message: string } | { __typename: 'FieldErrors', fieldErrors: Array<{ __typename: 'FieldError', message: string, field: string }> } | { __typename: 'User', id: string } };

export type UpdateUserProfileMutationVariables = Exact<{
  input: UpdateUserProfileInput;
}>;


export type UpdateUserProfileMutation = { __typename: 'Mutation', updateUserProfile: { __typename: 'AuthError', message: string } | { __typename: 'Error', message: string } | { __typename: 'FieldErrors', fieldErrors: Array<{ __typename: 'FieldError', message: string, field: string }> } | { __typename: 'User', id: string, username: string, name: string, email: string, profile?: { __typename: 'UserProfile', id: string, bio?: string | null, avatar?: string | null, link?: string | null } | null } };

export type ViewerIsLoggedInQueryVariables = Exact<{ [key: string]: never; }>;


export type ViewerIsLoggedInQuery = { __typename: 'Query', viewer?: { __typename: 'User', id: string, username: string, hasCreatedADate: boolean, role: { __typename: 'Role', id: string, name: string } } | null };

export type CategorizedDateListsQueryVariables = Exact<{ [key: string]: never; }>;


export type CategorizedDateListsQuery = { __typename: 'Query', categorizedDateLists: Array<{ __typename: 'CategorizedDateList', title: string, description?: string | null, id: string, dates: Array<{ __typename: 'FreeDate', id: string, title: string, archived: boolean, thumbnail: string, updatedAt: string, nsfw: boolean, description: string, viewerFavorited: boolean, estimatedTime: string, tastemaker: { __typename: 'Tastemaker', id: string, user: { __typename: 'User', id: string, name: string, profile?: { __typename: 'UserProfile', id: string, avatar?: string | null } | null } }, cities: Array<{ __typename: 'City', id: string, nameAndState: string }> }> }> };

export type GetCitiesQueryVariables = Exact<{
  text: Scalars['String']['input'];
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  selected?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
}>;


export type GetCitiesQuery = { __typename: 'Query', cities: { __typename: 'CityConnection', edges: Array<{ __typename: 'CityEdge', cursor: string, node: { __typename: 'City', nameAndState: string, id: string } }>, pageInfo: { __typename: 'PageInfo', hasNextPage: boolean, endCursor: string } } };

export type GetFreeDateDraftQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetFreeDateDraftQuery = { __typename: 'Query', freeDateDraft: { __typename: 'AuthError', message: string } | { __typename: 'Error', message: string } | { __typename: 'FreeDateDraft', id: string, title?: string | null, thumbnail?: string | null, description?: string | null, nsfw: boolean, prep: Array<string>, recommendedTime?: string | null, tags: Array<{ __typename: 'Tag', id: string, text: string }>, orderedStops: Array<{ __typename: 'OrderedDateStopDraft', id: string, order: number, estimatedTime: number, optional: boolean, options: Array<{ __typename: 'DateStopOptionDraft', id: string, optionOrder: number, title?: string | null, content?: string | null, location?: { __typename: 'Location', id: string, name: string } | null }> }> } };

export type GetViewerFavoritesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetViewerFavoritesQuery = { __typename: 'Query', viewer?: { __typename: 'User', favoritedDates: Array<{ __typename: 'FreeDate', id: string, title: string, archived: boolean, thumbnail: string, updatedAt: string, nsfw: boolean, description: string, viewerFavorited: boolean, estimatedTime: string, tastemaker: { __typename: 'Tastemaker', id: string, user: { __typename: 'User', id: string, name: string, profile?: { __typename: 'UserProfile', id: string, avatar?: string | null } | null } }, cities: Array<{ __typename: 'City', id: string, nameAndState: string }> }> } | null };

export type GetEditFreeDateQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetEditFreeDateQuery = { __typename: 'Query', getEditFreeDate: { __typename: 'AuthError', message: string } | { __typename: 'Error', message: string } | { __typename: 'FreeDate', id: string, title: string, description: string, thumbnail: string, nsfw: boolean, prep: Array<string>, recommendedTime: string, tags: Array<{ __typename: 'Tag', id: string, text: string }>, tastemaker: { __typename: 'Tastemaker', id: string, isSetup: boolean, formattedPrice: string, user: { __typename: 'User', id: string, username: string, name: string, profile?: { __typename: 'UserProfile', id: string, avatar?: string | null } | null } }, orderedStops: Array<{ __typename: 'OrderedDateStop', id: string, order: number, formattedEstimatedTime: string, estimatedTimeHoursMinutes: string, optional: boolean, options: Array<{ __typename: 'DateStopOption', id: string, optionOrder: number, title: string, content: string, hasNextOption: boolean, hasPreviousOption: boolean, showOptions: boolean, travel?: Array<{ __typename: 'Travel', distance: number, duration: number, mode: TravelMode, destinationId: string }> | null, location: { __typename: 'Location', id: string, name: string, website?: string | null, address: { __typename: 'Address', id: string, formattedAddress: string, city: { __typename: 'City', id: string, name: string }, coordinates: { __typename: 'Coordinates', lat: number, lng: number } } } }> }> } };

export type GetFreeDateQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetFreeDateQuery = { __typename: 'Query', freeDate: { __typename: 'Error', message: string } | { __typename: 'FreeDate', id: string, title: string, description: string, thumbnail: string, archived: boolean, nsfw: boolean, createdAt: string, updatedAt: string, prep: Array<string>, isUserTastemaker: boolean, viewerFavorited: boolean, viewerAuthorizedGoogleCalendar: boolean, recommendedTime: string, cities: Array<{ __typename: 'City', id: string, nameAndState: string, name: string }>, tags: Array<{ __typename: 'Tag', id: string, text: string }>, tastemaker: { __typename: 'Tastemaker', id: string, isSetup: boolean, formattedPrice: string, user: { __typename: 'User', id: string, username: string, name: string, profile?: { __typename: 'UserProfile', id: string, avatar?: string | null } | null } }, orderedStops: Array<{ __typename: 'OrderedDateStop', id: string, order: number, formattedEstimatedTime: string, estimatedTimeHoursMinutes: string, optional: boolean, options: Array<{ __typename: 'DateStopOption', id: string, optionOrder: number, title: string, content: string, hasNextOption: boolean, hasPreviousOption: boolean, showOptions: boolean, travel?: Array<{ __typename: 'Travel', distance: number, duration: number, mode: TravelMode, destinationId: string }> | null, location: { __typename: 'Location', id: string, name: string, website?: string | null, address: { __typename: 'Address', id: string, formattedAddress: string, city: { __typename: 'City', id: string, name: string }, coordinates: { __typename: 'Coordinates', lat: number, lng: number } } } }> }>, exploreMore: Array<{ __typename: 'FreeDate', id: string, title: string, archived: boolean, thumbnail: string, updatedAt: string, nsfw: boolean, description: string, viewerFavorited: boolean, estimatedTime: string, tastemaker: { __typename: 'Tastemaker', id: string, user: { __typename: 'User', id: string, name: string, profile?: { __typename: 'UserProfile', id: string, avatar?: string | null } | null } }, cities: Array<{ __typename: 'City', id: string, nameAndState: string }> }> } };

export type FreeDatesQueryVariables = Exact<{
  query?: InputMaybe<Scalars['String']['input']>;
  nsfw?: InputMaybe<Scalars['String']['input']>;
  cities?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
}>;


export type FreeDatesQuery = { __typename: 'Query', freeDates: { __typename: 'FreeDateConnection', edges: Array<{ __typename: 'FreeDateEdge', node: { __typename: 'FreeDate', id: string, title: string, archived: boolean, thumbnail: string, updatedAt: string, nsfw: boolean, description: string, viewerFavorited: boolean, estimatedTime: string, tastemaker: { __typename: 'Tastemaker', id: string, user: { __typename: 'User', id: string, name: string, profile?: { __typename: 'UserProfile', id: string, avatar?: string | null } | null } }, cities: Array<{ __typename: 'City', id: string, nameAndState: string }> } }> } };

export type GetAdminGroupDateQueryVariables = Exact<{
  groupDateId: Scalars['String']['input'];
}>;


export type GetAdminGroupDateQuery = { __typename: 'Query', groupDate: { __typename: 'Error', message: string } | { __typename: 'GroupDate', title: string, image: string, numSpots: number, startDate: string, numUsersSignedUp: number, waitlistGroups: Array<{ __typename: 'GroupDateWaitlistGroup', id: string, code: string, users: Array<{ __typename: 'User', id: string, name: string, email: string }> }> } };

export type GetGroupDateQueryVariables = Exact<{
  groupDateId: Scalars['String']['input'];
}>;


export type GetGroupDateQuery = { __typename: 'Query', groupDate: { __typename: 'Error', message: string } | { __typename: 'GroupDate', description: string, title: string, image: string, createdAt: string, updatedAt: string, id: string, numSpots: number, startDate: string, lastSignupDate: string, canStillSignup: boolean, numUsersSignedUp: number, minimumPrice: number, maximumPrice: number, cities: Array<{ __typename: 'City', nameAndState: string, name: string, id: string }>, tastemaker: { __typename: 'Tastemaker', id: string, isSetup: boolean, formattedPrice: string, user: { __typename: 'User', id: string, username: string, name: string, profile?: { __typename: 'UserProfile', id: string, avatar?: string | null } | null } }, userWaitlistGroup?: { __typename: 'GroupDateWaitlistGroup', code: string, position: number } | null, stops: Array<{ __typename: 'GroupDateOrderedStop', id: string, description: string, order: number, formattedEstimatedTime: string, travel?: { __typename: 'Travel', distance: number, duration: number, mode: TravelMode, destinationId: string } | null, location: { __typename: 'Location', images: Array<string>, id: string, name: string, website?: string | null, address: { __typename: 'Address', id: string, formattedAddress: string, city: { __typename: 'City', id: string, name: string }, coordinates: { __typename: 'Coordinates', lat: number, lng: number } } } }>, products: Array<{ __typename: 'GroupDateProduct', description: string, id: string, name: string, order: number, image: string }>, addOns: Array<{ __typename: 'GroupDateAddOn', description: string, id: string, name: string, order: number, image?: string | null, minimumPrice: number, maximumPrice: number }> } };

export type GetGroupDatesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetGroupDatesQuery = { __typename: 'Query', groupDates: Array<{ __typename: 'GroupDate', title: string, image: string, description: string, id: string, startDate: string, lastSignupDate: string, numSpots: number, numUsersSignedUp: number, tastemaker: { __typename: 'Tastemaker', id: string, isSetup: boolean, formattedPrice: string, user: { __typename: 'User', id: string, username: string, name: string, profile?: { __typename: 'UserProfile', id: string, avatar?: string | null } | null } }, cities: Array<{ __typename: 'City', id: string, nameAndState: string }> }> };

export type GetGoogleLocationsQueryVariables = Exact<{
  text: Scalars['String']['input'];
}>;


export type GetGoogleLocationsQuery = { __typename: 'Query', getGoogleLocations: Array<{ __typename: 'GoogleLocation', website?: string | null, name: string, formattedAddress: string }> };

export type LocationsQueryVariables = Exact<{
  text: Scalars['String']['input'];
}>;


export type LocationsQuery = { __typename: 'Query', locations: { __typename: 'LocationConnection', edges: Array<{ __typename: 'LocationEdge', node: { __typename: 'Location', id: string, name: string, address: { __typename: 'Address', formattedAddress: string, id: string } } }> } };

export type PlannedDateListQueryVariables = Exact<{ [key: string]: never; }>;


export type PlannedDateListQuery = { __typename: 'Query', viewer?: { __typename: 'User', upcomingPlannedDates: Array<{ __typename: 'PlannedDate', id: string, plannedTime: string, variation?: { __typename: 'FreeDateVariation', freeDate: { __typename: 'FreeDate', id: string, title: string, archived: boolean, thumbnail: string, updatedAt: string, nsfw: boolean, description: string, viewerFavorited: boolean, estimatedTime: string, tastemaker: { __typename: 'Tastemaker', id: string, user: { __typename: 'User', id: string, name: string, profile?: { __typename: 'UserProfile', id: string, avatar?: string | null } | null } }, cities: Array<{ __typename: 'City', id: string, nameAndState: string }> } } | null, guest?: { __typename: 'PlannedDateGuest', name?: string | null } | null }>, previousPlannedDates: Array<{ __typename: 'PlannedDate', id: string, plannedTime: string, variation?: { __typename: 'FreeDateVariation', freeDate: { __typename: 'FreeDate', id: string, title: string, archived: boolean, thumbnail: string, updatedAt: string, nsfw: boolean, description: string, viewerFavorited: boolean, estimatedTime: string, tastemaker: { __typename: 'Tastemaker', id: string, user: { __typename: 'User', id: string, name: string, profile?: { __typename: 'UserProfile', id: string, avatar?: string | null } | null } }, cities: Array<{ __typename: 'City', id: string, nameAndState: string }> } } | null, guest?: { __typename: 'PlannedDateGuest', name?: string | null } | null }> } | null };

export type GetSpecialOfferQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSpecialOfferQuery = { __typename: 'Query', getSpecialOffer?: { __typename: 'SpecialOffer', id: string, title: string, description: string, icon: string, color: string } | null };

export type DateSuggestionsQueryVariables = Exact<{ [key: string]: never; }>;


export type DateSuggestionsQuery = { __typename: 'Query', dateSuggestions: Array<{ __typename: 'DateSuggestion', id: string, text: string, cities: Array<{ __typename: 'City', id: string, nameAndState: string }> }> };

export type DraftsQueryVariables = Exact<{ [key: string]: never; }>;


export type DraftsQuery = { __typename: 'Query', viewer?: { __typename: 'User', id: string, drafts: Array<{ __typename: 'FreeDateDraft', id: string, title?: string | null, thumbnail?: string | null, updatedAt: string, author: { __typename: 'User', id: string, name: string, email: string } }> } | null };

export type GetViewerFreeDateAnalyticsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetViewerFreeDateAnalyticsQuery = { __typename: 'Query', viewer?: { __typename: 'User', id: string, tastemaker?: { __typename: 'Tastemaker', id: string, freeDates: Array<{ __typename: 'FreeDate', id: string, title: string, thumbnail: string, numPlannedDates: number, favoriteCount: number, views?: { __typename: 'FreeDateViews', id: string, viewCount: number } | null }> } | null } | null };

export type GetViewerFreeDatesQueryVariables = Exact<{
  archived: Scalars['Boolean']['input'];
}>;


export type GetViewerFreeDatesQuery = { __typename: 'Query', viewer?: { __typename: 'User', id: string, tastemaker?: { __typename: 'Tastemaker', id: string, freeDates: Array<{ __typename: 'FreeDate', id: string, title: string, archived: boolean, thumbnail: string, updatedAt: string, nsfw: boolean, description: string, viewerFavorited: boolean, estimatedTime: string, tastemaker: { __typename: 'Tastemaker', id: string, user: { __typename: 'User', id: string, name: string, profile?: { __typename: 'UserProfile', id: string, avatar?: string | null } | null } }, cities: Array<{ __typename: 'City', id: string, nameAndState: string }> }> } | null } | null };

export type GetProfileQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type GetProfileQuery = { __typename: 'Query', user: { __typename: 'Error', message: string } | { __typename: 'User', id: string, isUsersProfile: boolean, name: string, username: string, tastemaker?: { __typename: 'Tastemaker', id: string, freeDates: Array<{ __typename: 'FreeDate', id: string, title: string, archived: boolean, thumbnail: string, updatedAt: string, nsfw: boolean, description: string, viewerFavorited: boolean, estimatedTime: string, tastemaker: { __typename: 'Tastemaker', id: string, user: { __typename: 'User', id: string, name: string, profile?: { __typename: 'UserProfile', id: string, avatar?: string | null } | null } }, cities: Array<{ __typename: 'City', id: string, nameAndState: string }> }> } | null, profile?: { __typename: 'UserProfile', id: string, avatar?: string | null, link?: string | null, bio?: string | null } | null } };

export type GetViewerInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type GetViewerInfoQuery = { __typename: 'Query', viewer?: { __typename: 'User', id: string, username: string, name: string, email: string, profile?: { __typename: 'UserProfile', id: string, bio?: string | null, avatar?: string | null, link?: string | null } | null } | null };

export type ViewerHasDefaultGuestQueryVariables = Exact<{ [key: string]: never; }>;


export type ViewerHasDefaultGuestQuery = { __typename: 'Query', viewer?: { __typename: 'User', defaultGuest?: { __typename: 'DefaultGuest', name?: string | null, email: string } | null } | null };

export const FreeDateCardFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FreeDateCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FreeDate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"archived"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"nsfw"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"viewerFavorited"}},{"kind":"Field","name":{"kind":"Name","value":"estimatedTime"}},{"kind":"Field","name":{"kind":"Name","value":"tastemaker"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"cities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nameAndState"}}]}}]}}]} as unknown as DocumentNode<FreeDateCardFragment, unknown>;
export const CategorizedDateListFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CategorizedDateList"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CategorizedDateList"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"dates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FreeDateCard"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FreeDateCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FreeDate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"archived"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"nsfw"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"viewerFavorited"}},{"kind":"Field","name":{"kind":"Name","value":"estimatedTime"}},{"kind":"Field","name":{"kind":"Name","value":"tastemaker"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"cities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nameAndState"}}]}}]}}]} as unknown as DocumentNode<CategorizedDateListFragment, unknown>;
export const DraftCardFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DraftCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FreeDateDraft"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<DraftCardFragment, unknown>;
export const DateStopOptionDraftFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DateStopOptionDraft"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"DateStopOptionDraft"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"optionOrder"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<DateStopOptionDraftFragment, unknown>;
export const OrderedDateStopDraftFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"OrderedDateStopDraft"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OrderedDateStopDraft"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"estimatedTime"}},{"kind":"Field","name":{"kind":"Name","value":"optional"}},{"kind":"Field","name":{"kind":"Name","value":"options"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"DateStopOptionDraft"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DateStopOptionDraft"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"DateStopOptionDraft"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"optionOrder"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<OrderedDateStopDraftFragment, unknown>;
export const TagsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Tags"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}}]}}]} as unknown as DocumentNode<TagsFragment, unknown>;
export const TastemakerInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TastemakerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tastemaker"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isSetup"}},{"kind":"Field","name":{"kind":"Name","value":"formattedPrice"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]}}]}}]} as unknown as DocumentNode<TastemakerInfoFragment, unknown>;
export const TravelItemFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TravelItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Travel"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"distance"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"destinationId"}}]}}]} as unknown as DocumentNode<TravelItemFragment, unknown>;
export const LocationInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LocationInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Location"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"website"}},{"kind":"Field","name":{"kind":"Name","value":"address"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"formattedAddress"}},{"kind":"Field","name":{"kind":"Name","value":"city"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"coordinates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}}]}}]}}]} as unknown as DocumentNode<LocationInfoFragment, unknown>;
export const DateStopOptionFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DateStopOption"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"DateStopOption"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"optionOrder"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextOption"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousOption"}},{"kind":"Field","name":{"kind":"Name","value":"showOptions"}},{"kind":"Field","name":{"kind":"Name","value":"travel"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TravelItem"}}]}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LocationInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TravelItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Travel"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"distance"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"destinationId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LocationInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Location"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"website"}},{"kind":"Field","name":{"kind":"Name","value":"address"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"formattedAddress"}},{"kind":"Field","name":{"kind":"Name","value":"city"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"coordinates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}}]}}]}}]} as unknown as DocumentNode<DateStopOptionFragment, unknown>;
export const OrderedDateStopFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"OrderedDateStop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OrderedDateStop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"formattedEstimatedTime"}},{"kind":"Field","name":{"kind":"Name","value":"estimatedTimeHoursMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"optional"}},{"kind":"Field","name":{"kind":"Name","value":"options"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"DateStopOption"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TravelItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Travel"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"distance"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"destinationId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LocationInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Location"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"website"}},{"kind":"Field","name":{"kind":"Name","value":"address"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"formattedAddress"}},{"kind":"Field","name":{"kind":"Name","value":"city"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"coordinates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DateStopOption"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"DateStopOption"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"optionOrder"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextOption"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousOption"}},{"kind":"Field","name":{"kind":"Name","value":"showOptions"}},{"kind":"Field","name":{"kind":"Name","value":"travel"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TravelItem"}}]}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LocationInfo"}}]}}]}}]} as unknown as DocumentNode<OrderedDateStopFragment, unknown>;
export const GetFreeDateFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GetFreeDate"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FreeDate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail"}},{"kind":"Field","name":{"kind":"Name","value":"archived"}},{"kind":"Field","name":{"kind":"Name","value":"nsfw"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"prep"}},{"kind":"Field","name":{"kind":"Name","value":"isUserTastemaker"}},{"kind":"Field","name":{"kind":"Name","value":"viewerFavorited"}},{"kind":"Field","name":{"kind":"Name","value":"viewerAuthorizedGoogleCalendar"}},{"kind":"Field","name":{"kind":"Name","value":"recommendedTime"}},{"kind":"Field","name":{"kind":"Name","value":"cities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nameAndState"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Tags"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tastemaker"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TastemakerInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"orderedStops"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"OrderedDateStop"}}]}},{"kind":"Field","name":{"kind":"Name","value":"exploreMore"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FreeDateCard"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TravelItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Travel"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"distance"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"destinationId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LocationInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Location"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"website"}},{"kind":"Field","name":{"kind":"Name","value":"address"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"formattedAddress"}},{"kind":"Field","name":{"kind":"Name","value":"city"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"coordinates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DateStopOption"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"DateStopOption"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"optionOrder"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextOption"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousOption"}},{"kind":"Field","name":{"kind":"Name","value":"showOptions"}},{"kind":"Field","name":{"kind":"Name","value":"travel"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TravelItem"}}]}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LocationInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Tags"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TastemakerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tastemaker"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isSetup"}},{"kind":"Field","name":{"kind":"Name","value":"formattedPrice"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"OrderedDateStop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OrderedDateStop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"formattedEstimatedTime"}},{"kind":"Field","name":{"kind":"Name","value":"estimatedTimeHoursMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"optional"}},{"kind":"Field","name":{"kind":"Name","value":"options"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"DateStopOption"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FreeDateCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FreeDate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"archived"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"nsfw"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"viewerFavorited"}},{"kind":"Field","name":{"kind":"Name","value":"estimatedTime"}},{"kind":"Field","name":{"kind":"Name","value":"tastemaker"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"cities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nameAndState"}}]}}]}}]} as unknown as DocumentNode<GetFreeDateFragment, unknown>;
export const GroupDateAddOnFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GroupDateAddOn"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GroupDateAddOn"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"minimumPrice"}},{"kind":"Field","name":{"kind":"Name","value":"maximumPrice"}}]}}]} as unknown as DocumentNode<GroupDateAddOnFragment, unknown>;
export const GroupDateCardFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GroupDateCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GroupDate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"lastSignupDate"}},{"kind":"Field","name":{"kind":"Name","value":"numSpots"}},{"kind":"Field","name":{"kind":"Name","value":"numUsersSignedUp"}},{"kind":"Field","name":{"kind":"Name","value":"tastemaker"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TastemakerInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nameAndState"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TastemakerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tastemaker"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isSetup"}},{"kind":"Field","name":{"kind":"Name","value":"formattedPrice"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]}}]}}]} as unknown as DocumentNode<GroupDateCardFragment, unknown>;
export const GroupDateOrderedStopFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GroupDateOrderedStop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GroupDateOrderedStop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"formattedEstimatedTime"}},{"kind":"Field","name":{"kind":"Name","value":"travel"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TravelItem"}}]}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LocationInfo"}},{"kind":"Field","name":{"kind":"Name","value":"images"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TravelItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Travel"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"distance"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"destinationId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LocationInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Location"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"website"}},{"kind":"Field","name":{"kind":"Name","value":"address"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"formattedAddress"}},{"kind":"Field","name":{"kind":"Name","value":"city"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"coordinates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}}]}}]}}]} as unknown as DocumentNode<GroupDateOrderedStopFragment, unknown>;
export const GroupDateProductFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GroupDateProduct"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GroupDateProduct"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]} as unknown as DocumentNode<GroupDateProductFragment, unknown>;
export const GroupDateWaitlistGroupFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GroupDateWaitlistGroup"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GroupDateWaitlistGroup"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"position"}}]}}]} as unknown as DocumentNode<GroupDateWaitlistGroupFragment, unknown>;
export const PlannedDateCardFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlannedDateCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PlannedDate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"variation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"freeDate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FreeDateCard"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"plannedTime"}},{"kind":"Field","name":{"kind":"Name","value":"guest"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FreeDateCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FreeDate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"archived"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"nsfw"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"viewerFavorited"}},{"kind":"Field","name":{"kind":"Name","value":"estimatedTime"}},{"kind":"Field","name":{"kind":"Name","value":"tastemaker"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"cities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nameAndState"}}]}}]}}]} as unknown as DocumentNode<PlannedDateCardFragment, unknown>;
export const SpecialOfferFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SpecialOffer"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SpecialOffer"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}}]} as unknown as DocumentNode<SpecialOfferFragment, unknown>;
export const DateAnalyticsCardFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DateAnalyticsCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FreeDate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail"}},{"kind":"Field","name":{"kind":"Name","value":"numPlannedDates"}},{"kind":"Field","name":{"kind":"Name","value":"favoriteCount"}},{"kind":"Field","name":{"kind":"Name","value":"views"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"viewCount"}}]}}]}}]} as unknown as DocumentNode<DateAnalyticsCardFragment, unknown>;
export const DateSuggestionCardFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DateSuggestionCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"DateSuggestion"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"cities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nameAndState"}}]}}]}}]} as unknown as DocumentNode<DateSuggestionCardFragment, unknown>;
export const UserProfileHeadingFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserProfileHeading"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isUsersProfile"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"link"}}]}}]}}]} as unknown as DocumentNode<UserProfileHeadingFragment, unknown>;
export const UserBioFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserBio"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}}]}}]}}]} as unknown as DocumentNode<UserBioFragment, unknown>;
export const UserProfileLeftSideFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserProfileLeftSide"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserProfileHeading"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserBio"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserProfileHeading"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isUsersProfile"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"link"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserBio"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}}]}}]}}]} as unknown as DocumentNode<UserProfileLeftSideFragment, unknown>;
export const UserProfileFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserProfile"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserProfileLeftSide"}},{"kind":"Field","name":{"kind":"Name","value":"tastemaker"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"freeDates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FreeDateCard"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserProfileHeading"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isUsersProfile"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"link"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserBio"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserProfileLeftSide"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserProfileHeading"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserBio"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FreeDateCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FreeDate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"archived"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"nsfw"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"viewerFavorited"}},{"kind":"Field","name":{"kind":"Name","value":"estimatedTime"}},{"kind":"Field","name":{"kind":"Name","value":"tastemaker"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"cities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nameAndState"}}]}}]}}]} as unknown as DocumentNode<UserProfileFragment, unknown>;
export const LoginWithGoogleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginWithGoogle"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginWithGoogleInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginWithGoogle"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<LoginWithGoogleMutation, LoginWithGoogleMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AlreadyLoggedInError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FieldErrors"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fieldErrors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"field"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LogoutResult"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}}]}}]}}]}}]} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Register"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RegisterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FieldErrors"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fieldErrors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"field"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AlreadyLoggedInError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const RequestPasswordResetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RequestPasswordReset"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RequestPasswordResetInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"requestPasswordReset"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FieldErrors"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fieldErrors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RequestPasswordResetResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<RequestPasswordResetMutation, RequestPasswordResetMutationVariables>;
export const ResetPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResetPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ResetPasswordInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resetPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const CreateDateItineraryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateDateItinerary"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateDateItineraryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createDateItinerary"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FieldErrors"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fieldErrors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"field"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PlannedDate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"plannedTime"}},{"kind":"Field","name":{"kind":"Name","value":"variation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"freeDate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"tastemaker"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"orderedStops"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"options"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"cities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<CreateDateItineraryMutation, CreateDateItineraryMutationVariables>;
export const SaveFreeDateDraftDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SaveFreeDateDraft"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SaveFreeDateDraftInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"saveFreeDateDraft"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FreeDateDraft"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"DraftCard"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FieldErrors"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fieldErrors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"field"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DraftCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FreeDateDraft"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<SaveFreeDateDraftMutation, SaveFreeDateDraftMutationVariables>;
export const ToggleFavoriteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ToggleFavorite"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ToggleFavoriteInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"toggleFavorite"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ToggleFavoriteResult"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]}}]} as unknown as DocumentNode<ToggleFavoriteMutation, ToggleFavoriteMutationVariables>;
export const ArchiveFreeDateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ArchiveFreeDate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ArchiveFreeDateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"archiveFreeDate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FreeDate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FreeDateCard"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FreeDateCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FreeDate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"archived"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"nsfw"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"viewerFavorited"}},{"kind":"Field","name":{"kind":"Name","value":"estimatedTime"}},{"kind":"Field","name":{"kind":"Name","value":"tastemaker"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"cities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nameAndState"}}]}}]}}]} as unknown as DocumentNode<ArchiveFreeDateMutation, ArchiveFreeDateMutationVariables>;
export const CreateFreeDateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateFreeDate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateFreeDateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createFreeDate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FreeDate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FreeDateCard"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FieldErrors"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fieldErrors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"field"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FreeDateCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FreeDate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"archived"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"nsfw"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"viewerFavorited"}},{"kind":"Field","name":{"kind":"Name","value":"estimatedTime"}},{"kind":"Field","name":{"kind":"Name","value":"tastemaker"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"cities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nameAndState"}}]}}]}}]} as unknown as DocumentNode<CreateFreeDateMutation, CreateFreeDateMutationVariables>;
export const HelpFindingADateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"HelpFindingADate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"HelpFindingADateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"helpFindingADate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FieldErrors"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fieldErrors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"field"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HelpFindingADateResult"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}}]}}]}}]}}]} as unknown as DocumentNode<HelpFindingADateMutation, HelpFindingADateMutationVariables>;
export const RestoreFreeDateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RestoreFreeDate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RestoreFreeDateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"restoreFreeDate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FreeDate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FreeDateCard"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FreeDateCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FreeDate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"archived"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"nsfw"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"viewerFavorited"}},{"kind":"Field","name":{"kind":"Name","value":"estimatedTime"}},{"kind":"Field","name":{"kind":"Name","value":"tastemaker"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"cities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nameAndState"}}]}}]}}]} as unknown as DocumentNode<RestoreFreeDateMutation, RestoreFreeDateMutationVariables>;
export const UpdateFreeDateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateFreeDate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateFreeDateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateFreeDate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FieldErrors"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fieldErrors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FreeDate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail"}},{"kind":"Field","name":{"kind":"Name","value":"archived"}},{"kind":"Field","name":{"kind":"Name","value":"nsfw"}},{"kind":"Field","name":{"kind":"Name","value":"prep"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tastemaker"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TastemakerInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"orderedStops"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"OrderedDateStop"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TravelItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Travel"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"distance"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"destinationId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LocationInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Location"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"website"}},{"kind":"Field","name":{"kind":"Name","value":"address"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"formattedAddress"}},{"kind":"Field","name":{"kind":"Name","value":"city"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"coordinates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DateStopOption"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"DateStopOption"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"optionOrder"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextOption"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousOption"}},{"kind":"Field","name":{"kind":"Name","value":"showOptions"}},{"kind":"Field","name":{"kind":"Name","value":"travel"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TravelItem"}}]}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LocationInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TastemakerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tastemaker"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isSetup"}},{"kind":"Field","name":{"kind":"Name","value":"formattedPrice"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"OrderedDateStop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OrderedDateStop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"formattedEstimatedTime"}},{"kind":"Field","name":{"kind":"Name","value":"estimatedTimeHoursMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"optional"}},{"kind":"Field","name":{"kind":"Name","value":"options"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"DateStopOption"}}]}}]}}]} as unknown as DocumentNode<UpdateFreeDateMutation, UpdateFreeDateMutationVariables>;
export const SignUpForWaitlistDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignUpForWaitlist"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SignUpForWaitlistInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signUpForWaitlist"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GroupDateWaitlistGroup"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<SignUpForWaitlistMutation, SignUpForWaitlistMutationVariables>;
export const DeleteImageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteImage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteImageInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteImage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteImageResult"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteImageMutation, DeleteImageMutationVariables>;
export const GeneratePresignedUrlDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"GeneratePresignedUrl"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GeneratePresignedUrlInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"generatePresignedUrl"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GeneratePresignedUrlResult"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}}]}}]}}]}}]} as unknown as DocumentNode<GeneratePresignedUrlMutation, GeneratePresignedUrlMutationVariables>;
export const CreateLocationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateLocation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateLocationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createLocation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FieldErrors"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fieldErrors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Location"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"address"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"formattedAddress"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CreateLocationMutation, CreateLocationMutationVariables>;
export const TrackDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Track"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"track"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<TrackMutation, TrackMutationVariables>;
export const DeleteFreeDateDraftDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteFreeDateDraft"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteFreeDateDraftInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteFreeDateDraft"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FreeDateDraft"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"DraftCard"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DraftCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FreeDateDraft"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<DeleteFreeDateDraftMutation, DeleteFreeDateDraftMutationVariables>;
export const RemoveDefaultGuestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveDefaultGuest"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeDefaultGuest"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"DefaultGuest"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<RemoveDefaultGuestMutation, RemoveDefaultGuestMutationVariables>;
export const SetDefaultGuestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SetDefaultGuest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SetDefaultGuestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setDefaultGuest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FieldErrors"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fieldErrors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"field"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"DefaultGuest"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<SetDefaultGuestMutation, SetDefaultGuestMutationVariables>;
export const UpdatePasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdatePasswordInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FieldErrors"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fieldErrors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"field"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<UpdatePasswordMutation, UpdatePasswordMutationVariables>;
export const UpdateUserProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUserProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserProfileInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUserProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"link"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FieldErrors"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fieldErrors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"field"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>;
export const ViewerIsLoggedInDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ViewerIsLoggedIn"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"hasCreatedADate"}},{"kind":"Field","name":{"kind":"Name","value":"role"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<ViewerIsLoggedInQuery, ViewerIsLoggedInQueryVariables>;
export const CategorizedDateListsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CategorizedDateLists"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categorizedDateLists"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CategorizedDateList"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FreeDateCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FreeDate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"archived"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"nsfw"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"viewerFavorited"}},{"kind":"Field","name":{"kind":"Name","value":"estimatedTime"}},{"kind":"Field","name":{"kind":"Name","value":"tastemaker"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"cities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nameAndState"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CategorizedDateList"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CategorizedDateList"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"dates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FreeDateCard"}}]}}]}}]} as unknown as DocumentNode<CategorizedDateListsQuery, CategorizedDateListsQueryVariables>;
export const GetCitiesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCities"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"text"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"selected"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cities"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"text"},"value":{"kind":"Variable","name":{"kind":"Name","value":"text"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"selected"},"value":{"kind":"Variable","name":{"kind":"Name","value":"selected"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nameAndState"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}}]}}]}}]} as unknown as DocumentNode<GetCitiesQuery, GetCitiesQueryVariables>;
export const GetFreeDateDraftDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFreeDateDraft"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"freeDateDraft"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FreeDateDraft"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"nsfw"}},{"kind":"Field","name":{"kind":"Name","value":"prep"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Tags"}}]}},{"kind":"Field","name":{"kind":"Name","value":"recommendedTime"}},{"kind":"Field","name":{"kind":"Name","value":"orderedStops"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"OrderedDateStopDraft"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DateStopOptionDraft"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"DateStopOptionDraft"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"optionOrder"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Tags"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"OrderedDateStopDraft"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OrderedDateStopDraft"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"estimatedTime"}},{"kind":"Field","name":{"kind":"Name","value":"optional"}},{"kind":"Field","name":{"kind":"Name","value":"options"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"DateStopOptionDraft"}}]}}]}}]} as unknown as DocumentNode<GetFreeDateDraftQuery, GetFreeDateDraftQueryVariables>;
export const GetViewerFavoritesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetViewerFavorites"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"favoritedDates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FreeDateCard"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FreeDateCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FreeDate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"archived"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"nsfw"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"viewerFavorited"}},{"kind":"Field","name":{"kind":"Name","value":"estimatedTime"}},{"kind":"Field","name":{"kind":"Name","value":"tastemaker"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"cities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nameAndState"}}]}}]}}]} as unknown as DocumentNode<GetViewerFavoritesQuery, GetViewerFavoritesQueryVariables>;
export const GetEditFreeDateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEditFreeDate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getEditFreeDate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FreeDate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail"}},{"kind":"Field","name":{"kind":"Name","value":"nsfw"}},{"kind":"Field","name":{"kind":"Name","value":"prep"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Tags"}}]}},{"kind":"Field","name":{"kind":"Name","value":"recommendedTime"}},{"kind":"Field","name":{"kind":"Name","value":"tastemaker"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TastemakerInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"orderedStops"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"OrderedDateStop"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TravelItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Travel"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"distance"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"destinationId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LocationInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Location"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"website"}},{"kind":"Field","name":{"kind":"Name","value":"address"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"formattedAddress"}},{"kind":"Field","name":{"kind":"Name","value":"city"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"coordinates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DateStopOption"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"DateStopOption"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"optionOrder"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextOption"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousOption"}},{"kind":"Field","name":{"kind":"Name","value":"showOptions"}},{"kind":"Field","name":{"kind":"Name","value":"travel"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TravelItem"}}]}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LocationInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Tags"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TastemakerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tastemaker"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isSetup"}},{"kind":"Field","name":{"kind":"Name","value":"formattedPrice"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"OrderedDateStop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OrderedDateStop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"formattedEstimatedTime"}},{"kind":"Field","name":{"kind":"Name","value":"estimatedTimeHoursMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"optional"}},{"kind":"Field","name":{"kind":"Name","value":"options"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"DateStopOption"}}]}}]}}]} as unknown as DocumentNode<GetEditFreeDateQuery, GetEditFreeDateQueryVariables>;
export const GetFreeDateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFreeDate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"freeDate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FreeDate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GetFreeDate"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Tags"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TastemakerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tastemaker"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isSetup"}},{"kind":"Field","name":{"kind":"Name","value":"formattedPrice"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TravelItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Travel"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"distance"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"destinationId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LocationInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Location"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"website"}},{"kind":"Field","name":{"kind":"Name","value":"address"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"formattedAddress"}},{"kind":"Field","name":{"kind":"Name","value":"city"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"coordinates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DateStopOption"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"DateStopOption"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"optionOrder"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextOption"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousOption"}},{"kind":"Field","name":{"kind":"Name","value":"showOptions"}},{"kind":"Field","name":{"kind":"Name","value":"travel"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TravelItem"}}]}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LocationInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"OrderedDateStop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OrderedDateStop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"formattedEstimatedTime"}},{"kind":"Field","name":{"kind":"Name","value":"estimatedTimeHoursMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"optional"}},{"kind":"Field","name":{"kind":"Name","value":"options"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"DateStopOption"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FreeDateCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FreeDate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"archived"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"nsfw"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"viewerFavorited"}},{"kind":"Field","name":{"kind":"Name","value":"estimatedTime"}},{"kind":"Field","name":{"kind":"Name","value":"tastemaker"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"cities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nameAndState"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GetFreeDate"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FreeDate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail"}},{"kind":"Field","name":{"kind":"Name","value":"archived"}},{"kind":"Field","name":{"kind":"Name","value":"nsfw"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"prep"}},{"kind":"Field","name":{"kind":"Name","value":"isUserTastemaker"}},{"kind":"Field","name":{"kind":"Name","value":"viewerFavorited"}},{"kind":"Field","name":{"kind":"Name","value":"viewerAuthorizedGoogleCalendar"}},{"kind":"Field","name":{"kind":"Name","value":"recommendedTime"}},{"kind":"Field","name":{"kind":"Name","value":"cities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nameAndState"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Tags"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tastemaker"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TastemakerInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"orderedStops"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"OrderedDateStop"}}]}},{"kind":"Field","name":{"kind":"Name","value":"exploreMore"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FreeDateCard"}}]}}]}}]} as unknown as DocumentNode<GetFreeDateQuery, GetFreeDateQueryVariables>;
export const FreeDatesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FreeDates"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"nsfw"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cities"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"freeDates"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}},{"kind":"Argument","name":{"kind":"Name","value":"nsfw"},"value":{"kind":"Variable","name":{"kind":"Name","value":"nsfw"}}},{"kind":"Argument","name":{"kind":"Name","value":"cities"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cities"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FreeDateCard"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FreeDateCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FreeDate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"archived"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"nsfw"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"viewerFavorited"}},{"kind":"Field","name":{"kind":"Name","value":"estimatedTime"}},{"kind":"Field","name":{"kind":"Name","value":"tastemaker"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"cities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nameAndState"}}]}}]}}]} as unknown as DocumentNode<FreeDatesQuery, FreeDatesQueryVariables>;
export const GetAdminGroupDateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAdminGroupDate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupDateId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"groupDate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupDateId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GroupDate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"numSpots"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"numUsersSignedUp"}},{"kind":"Field","name":{"kind":"Name","value":"waitlistGroups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetAdminGroupDateQuery, GetAdminGroupDateQueryVariables>;
export const GetGroupDateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetGroupDate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupDateId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"groupDate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupDateId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GroupDate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"cities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nameAndState"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tastemaker"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TastemakerInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"numSpots"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"lastSignupDate"}},{"kind":"Field","name":{"kind":"Name","value":"canStillSignup"}},{"kind":"Field","name":{"kind":"Name","value":"numUsersSignedUp"}},{"kind":"Field","name":{"kind":"Name","value":"minimumPrice"}},{"kind":"Field","name":{"kind":"Name","value":"maximumPrice"}},{"kind":"Field","name":{"kind":"Name","value":"userWaitlistGroup"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GroupDateWaitlistGroup"}}]}},{"kind":"Field","name":{"kind":"Name","value":"stops"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GroupDateOrderedStop"}}]}},{"kind":"Field","name":{"kind":"Name","value":"products"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GroupDateProduct"}}]}},{"kind":"Field","name":{"kind":"Name","value":"addOns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GroupDateAddOn"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TravelItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Travel"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"distance"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"destinationId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LocationInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Location"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"website"}},{"kind":"Field","name":{"kind":"Name","value":"address"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"formattedAddress"}},{"kind":"Field","name":{"kind":"Name","value":"city"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"coordinates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TastemakerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tastemaker"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isSetup"}},{"kind":"Field","name":{"kind":"Name","value":"formattedPrice"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GroupDateWaitlistGroup"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GroupDateWaitlistGroup"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"position"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GroupDateOrderedStop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GroupDateOrderedStop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"formattedEstimatedTime"}},{"kind":"Field","name":{"kind":"Name","value":"travel"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TravelItem"}}]}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LocationInfo"}},{"kind":"Field","name":{"kind":"Name","value":"images"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GroupDateProduct"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GroupDateProduct"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GroupDateAddOn"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GroupDateAddOn"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"minimumPrice"}},{"kind":"Field","name":{"kind":"Name","value":"maximumPrice"}}]}}]} as unknown as DocumentNode<GetGroupDateQuery, GetGroupDateQueryVariables>;
export const GetGroupDatesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetGroupDates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"groupDates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GroupDateCard"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TastemakerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tastemaker"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isSetup"}},{"kind":"Field","name":{"kind":"Name","value":"formattedPrice"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GroupDateCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GroupDate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"lastSignupDate"}},{"kind":"Field","name":{"kind":"Name","value":"numSpots"}},{"kind":"Field","name":{"kind":"Name","value":"numUsersSignedUp"}},{"kind":"Field","name":{"kind":"Name","value":"tastemaker"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TastemakerInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nameAndState"}}]}}]}}]} as unknown as DocumentNode<GetGroupDatesQuery, GetGroupDatesQueryVariables>;
export const GetGoogleLocationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetGoogleLocations"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"text"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getGoogleLocations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"text"},"value":{"kind":"Variable","name":{"kind":"Name","value":"text"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"website"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"formattedAddress"}}]}}]}}]} as unknown as DocumentNode<GetGoogleLocationsQuery, GetGoogleLocationsQueryVariables>;
export const LocationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Locations"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"text"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"locations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"text"},"value":{"kind":"Variable","name":{"kind":"Name","value":"text"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"address"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"formattedAddress"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<LocationsQuery, LocationsQueryVariables>;
export const PlannedDateListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PlannedDateList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"upcomingPlannedDates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlannedDateCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"previousPlannedDates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlannedDateCard"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FreeDateCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FreeDate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"archived"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"nsfw"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"viewerFavorited"}},{"kind":"Field","name":{"kind":"Name","value":"estimatedTime"}},{"kind":"Field","name":{"kind":"Name","value":"tastemaker"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"cities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nameAndState"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlannedDateCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PlannedDate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"variation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"freeDate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FreeDateCard"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"plannedTime"}},{"kind":"Field","name":{"kind":"Name","value":"guest"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<PlannedDateListQuery, PlannedDateListQueryVariables>;
export const GetSpecialOfferDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSpecialOffer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSpecialOffer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SpecialOffer"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SpecialOffer"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SpecialOffer"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}}]} as unknown as DocumentNode<GetSpecialOfferQuery, GetSpecialOfferQueryVariables>;
export const DateSuggestionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DateSuggestions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dateSuggestions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"DateSuggestionCard"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DateSuggestionCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"DateSuggestion"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"cities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nameAndState"}}]}}]}}]} as unknown as DocumentNode<DateSuggestionsQuery, DateSuggestionsQueryVariables>;
export const DraftsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Drafts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"drafts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"DraftCard"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DraftCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FreeDateDraft"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<DraftsQuery, DraftsQueryVariables>;
export const GetViewerFreeDateAnalyticsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetViewerFreeDateAnalytics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tastemaker"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"freeDates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"DateAnalyticsCard"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DateAnalyticsCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FreeDate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail"}},{"kind":"Field","name":{"kind":"Name","value":"numPlannedDates"}},{"kind":"Field","name":{"kind":"Name","value":"favoriteCount"}},{"kind":"Field","name":{"kind":"Name","value":"views"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"viewCount"}}]}}]}}]} as unknown as DocumentNode<GetViewerFreeDateAnalyticsQuery, GetViewerFreeDateAnalyticsQueryVariables>;
export const GetViewerFreeDatesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetViewerFreeDates"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"archived"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tastemaker"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"freeDates"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"archived"},"value":{"kind":"Variable","name":{"kind":"Name","value":"archived"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FreeDateCard"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FreeDateCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FreeDate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"archived"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"nsfw"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"viewerFavorited"}},{"kind":"Field","name":{"kind":"Name","value":"estimatedTime"}},{"kind":"Field","name":{"kind":"Name","value":"tastemaker"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"cities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nameAndState"}}]}}]}}]} as unknown as DocumentNode<GetViewerFreeDatesQuery, GetViewerFreeDatesQueryVariables>;
export const GetProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserProfile"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserProfileHeading"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isUsersProfile"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"link"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserBio"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserProfileLeftSide"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserProfileHeading"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserBio"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FreeDateCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FreeDate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"archived"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"nsfw"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"viewerFavorited"}},{"kind":"Field","name":{"kind":"Name","value":"estimatedTime"}},{"kind":"Field","name":{"kind":"Name","value":"tastemaker"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"cities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nameAndState"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserProfile"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserProfileLeftSide"}},{"kind":"Field","name":{"kind":"Name","value":"tastemaker"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"freeDates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FreeDateCard"}}]}}]}}]}}]} as unknown as DocumentNode<GetProfileQuery, GetProfileQueryVariables>;
export const GetViewerInfoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetViewerInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"link"}}]}}]}}]}}]} as unknown as DocumentNode<GetViewerInfoQuery, GetViewerInfoQueryVariables>;
export const ViewerHasDefaultGuestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ViewerHasDefaultGuest"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"defaultGuest"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<ViewerHasDefaultGuestQuery, ViewerHasDefaultGuestQueryVariables>;