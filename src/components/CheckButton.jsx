import React from "react";
import styles from "../styles/modules/todoItem.module.scss";

function CheckButton({ checked, handleCheck }) {
  return (
    <>
      <input
        type="checkbox"
        className={styles.checkbox}
        checked={checked}
        onChange={() => handleCheck()}
        />
        </>
  );
}

export default CheckButton;
