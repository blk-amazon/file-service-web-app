export enum UserType {
  Patient = "Patient",
  Provider = "Provider"
}

// export type UserTypes2 = "Patient" | "Provider";

export enum ViewState {
  Idle, // When nothing is happening or just initialized
  Busy, // Typically shows a loading indicator of some sorts
  DataFetched, // Indicates that there's data available on the view
  NoDataAvailable, // Indicates that data was fetched successfully, but nothing is available
  Error, // Indicates there's an error on the view
  Success, // Successful action occurred
  WaitingForInput, // The starting state that a form view is in
}