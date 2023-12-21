import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  form: {
    flex: 1,
    width: "100%",
  },

  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
    textAlign: "center",
  },

  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    textAlign: "center",
  },
  logoutContainer: {
    width: "100%",
    alignItems: "center",
  },
  logoutButton: {
    display: "flex",
    width: 269,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: "#000",
  },
  logoutText: {
    color: "#fff",
    fontSize: 18,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },

  confirmButton: {
    backgroundColor: "#888",
    borderRadius: 100,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
    padding: 10,
    alignSelf: "center",
    width: 110,
    height: 50,
  },
  cancelButton: {
    backgroundColor: "#000",
    borderRadius: 100,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
    padding: 10,
    alignSelf: "center",
    width: 110,
    height: 50,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  inputContainer: {
    position: "relative",
    marginBottom: 20,
  },
  input: {
    fontSize: 16,
    color: "#555",
    padding: 8,
    textAlign: "center",
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,

    borderRadius: 5,
    padding: 5,
    borderColor: "transparent",
  },
  icon: {
    marginLeft: 10,
    position: "absolute",
    right: 10,
  },

  changePasswordButton: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "#888",
    padding: 10,
    borderRadius: 100,
    alignSelf: "center",
    alignItems: "center",
    width: 210,
    height: 50,
  },

  changePasswordText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
  myItemsButton: {
    position: "absolute",
    bottom: 1,
    width: "100%",
    alignItems: "center",
  },
  lostAndFoundBox: {
    width: 150,
    height: 70,
    backgroundColor: "#999",
    borderRadius: 3,
    overflow: "hidden",
    marginBottom: 19,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  boxTop: {
    height: 15,
    width: "100%",
    backgroundColor: "#888",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    position: "absolute",
    top: 0,
  },
  myItemsText: {
    color: "white",
    fontSize: 16,
    marginLeft: 10,
    justifyContent: "center",
  },
});
