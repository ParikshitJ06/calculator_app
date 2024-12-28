import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handlePress = (value) => {
    if (value === "=") {
      try {
        const calculatedResult = eval(input).toString();
        setResult(calculatedResult); // Show result in bold black
      } catch {
        setResult("Error");
      }
    } else if (value === "C") {
      setInput("");
      setResult("");
    } else if (value === "⌫") {
      setInput((prev) => prev.slice(0, -1)); // Remove the last character
    } else {
      setInput((prev) => prev + value); // Append the value to the input
    }
  };

  const renderButton = (value) => {
    let buttonStyle = styles.numberButton; // Default style for numbers

    if (value === "=") buttonStyle = styles.resultButton;
    else if (value === "C") buttonStyle = styles.clearButton;
    else if (["/", "*", "-", "+"].includes(value)) buttonStyle = styles.operatorButton;
    else if (["⌫", "(", ")"].includes(value)) buttonStyle = styles.nonNumberButton;

    return (
      <TouchableOpacity
        key={value}
        style={[styles.button, buttonStyle]}
        onPress={() => handlePress(value)}
      >
        <Text style={styles.buttonText}>{value}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Display Section */}
      <View style={styles.display}>
        <Text style={styles.input}>{input || "0"}</Text>
        <Text style={styles.result}>{result}</Text>
      </View>

      {/* Buttons Section */}
      <View style={styles.buttons}>
        {["C", "(", ")", "⌫"].map((item) => renderButton(item))}
        {["7", "8", "9", "/"].map((item) => renderButton(item))}
        {["4", "5", "6", "*"].map((item) => renderButton(item))}
        {["1", "2", "3", "-"].map((item) => renderButton(item))}
        {["0", ".", "+", "="].map((item) => renderButton(item))}
      </View>

      {/* Footer */}
      <Text style={styles.footer}>Calc by Parikshit</Text>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#1a1a2e", // Deep navy for a professional background
  },
  display: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    padding: 30,
    backgroundColor: "#16213e", // Slightly darker blue for the display
    borderBottomWidth: 2,
    borderBottomColor: "#0f3460", // Dark blue highlight
  },
  input: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#eaeaea", // Soft white for the input
  },
  result: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#ffffff", // Bright white for the result
    marginTop: 10,
  },
  buttons: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
    justifyContent: "space-around",
    backgroundColor: "#16213e", // Matches display background for consistency
  },
  button: {
    width: "22%",
    height: 70,
    margin: 5,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  buttonText: {
    fontSize: 22,
    color: "#ffffff", // Consistent white text for readability
    fontWeight: "bold",
  },
  numberButton: {
    backgroundColor: "#0f4c75", // Cool blue for number buttons
  },
  operatorButton: {
    backgroundColor: "#3282b8", // Professional lighter blue for operators
  },
  nonNumberButton: {
    backgroundColor: "#3282b8", // Subtle red for non-number functions
  },
  resultButton: {
    backgroundColor: "#0f9d58", // Professional green for "="
  },
  clearButton: {
    backgroundColor: "#d32f2f", // Vibrant red for "C"
  },
  footer: {
    textAlign: "center",
    padding: 12,
    fontSize: 16,
    backgroundColor: "#1a1a2e", // Footer matching the main background
    color: "#eaeaea", // Soft white for footer text
  },
});
