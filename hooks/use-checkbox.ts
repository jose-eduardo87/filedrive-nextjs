// ================================== ADDITIONAL NOTES ================================== //

// Implementing this custom hook was a defiant but very rewarding experience.
// My goal was to have a central place where I could manage checkbox state from
// different parts of my application. Being more specific, I have this parent
// component "Bin" which renders "N" child components "FileInBin". The latter would
// be added and removed dinamically, being 100% dependent on the user interaction.
// The FileInBin component returns a checkbox input. The challenges here are that we
// don't know how many input will be rendered and that there are two states for the
// same element: the individual checkbox and the toggle button, responsible for toggling
// all the checkboxes on and off.
// (...)
// So here is the main architecture:  I would have a list in the parent component
// that keeps track of all the files being added/removed and individual pieces of
// state for each checkbox. The list would be responsible for controlling the toggling
// state and to have an up-to-date information about the current items added/removed.
// Due to useEffect's own nature where it closures the states by the time the component
// is mounted, it was impossible to update the list with all the information regarding
// the files. To resolve that, to control the state was necessary to use useRef instead
// of useState/useReducer. To conclude, after a lot of refactoring, some frustrations
// and change of architecture, it took me three long days to come to this implementation.
// I had to deal with React's unique particularities. During this time, I learned important
// things, like the useEffect being limited to have the surrounding states with the values
// when the component got rendered, the impossibility of using hooks inside loops,
// conditionals and nested functions and most importantly: I am moved for good challenges.

import { useCallback, useState, useRef } from "react";

interface RegisteredFilesInterface {
  id: string;
  isChecked: boolean;
}

const useCheckbox = () => {
  // registeredFilesRef is used only inside this hook. useEffect does not have access to current states, so
  // it makes necessary to use a ref to keep track of latest state updates.
  const registeredFilesRef = useRef<typeof registeredFiles>([]);
  const [isTogglingCheckboxes, setIsTogglingCheckboxes] = useState(false);
  const [runUseEffect, setRunUseEffect] = useState(0);
  const [registeredFiles, setRegisteredFiles] = useState<
    Partial<RegisteredFilesInterface[]>
  >([]);

  // Function responsible to register all the information regarding files living in Bin.tsx.
  // By architecturing this way, Bin has access to control its children's (File.tsx) state,
  // making it simple doing state changes (eg: onToggleFiles()) to toggle on/off input selection.
  const registerFile = useCallback((id: string, isChecked: boolean) => {
    const index = registeredFilesRef.current.findIndex(
      (item) => item?.id === id
    );

    if (index < 0) {
      registeredFilesRef.current = [
        ...registeredFilesRef.current,
        { id, isChecked },
      ];
      setRegisteredFiles(registeredFilesRef.current);

      return;
    }

    const updatedFiles = [...registeredFilesRef.current];
    updatedFiles[index] = { id, isChecked };

    registeredFilesRef.current = updatedFiles;
    setRegisteredFiles(registeredFilesRef.current);
  }, []);

  // Runs everytime a component reaches its lifecycle. It filters the registeredFiles list by id
  // and removes the unmounted component.
  const unregisterFile = useCallback((id: string) => {
    const filteredRegisteredFiles = registeredFilesRef.current.filter(
      (file) => file!.id !== id
    );

    registeredFilesRef.current = filteredRegisteredFiles;
    setRegisteredFiles(filteredRegisteredFiles);
  }, []);

  // Handler responsible for toggling state for selection. Only problem for now is that when toggling item individually, things get messy.
  const onToggleFiles = useCallback(() => {
    // utility state to make useEffect in FileInBin run at every click on onToggleFiles.
    setRunUseEffect((currentState) => currentState + 1);
    // In case there is at least one File unchecked, all the files will be checked.
    // Otherwise, all the files will be unchecked.
    const hasUncheckedFile = registeredFilesRef.current.some(
      (file) => !file?.isChecked
    );

    setIsTogglingCheckboxes(hasUncheckedFile ? true : false);

    const updatedRegisteredFiles = [...registeredFilesRef.current];
    updatedRegisteredFiles.forEach(
      (file) => (file!.isChecked = isTogglingCheckboxes)
    );

    registeredFilesRef.current = updatedRegisteredFiles;

    setRegisteredFiles(updatedRegisteredFiles);
  }, [isTogglingCheckboxes]);

  return {
    detectiveFunctions: {
      registerFile,
      unregisterFile,
    },
    toggleState: {
      isTogglingCheckboxes,
      runUseEffect,
      onToggleFiles,
    },
    registeredFiles,
  };
};

export default useCheckbox;
