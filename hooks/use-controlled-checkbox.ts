// **************************** ADDITIONAL NOTES **************************** //

// It was a defiant but very rewarding experience to implement this custom hook.
// My goal was to have a central place where I could manage checkbox state from
// different parts of my application. Being more specific, I have this parent
// component "Bin" which renders "n" child components "FileInBin". The latter would be added
// and removed dinamically, being 100% dependent on the user interaction. The FileInBin
// component returns a checkbox input.
// (...)
// Due to useEffect nature where it closures the states by the time the component is mounted,
// it was impossible to update the central state with all the information regarding the files.
// (...) It took me two long days to come to this implementation. During this time, I learned important
// things, like the useEffect being limited to have the surrounding states with the values when the component
// got rendered, the impossibility of using hooks inside loops, conditionals and nested functions and
// most importantly: I have a passion for challenges.
//
// TO BE CONTINUED

import { useCallback, useState, useRef } from "react";

interface RegisteredFilesInterface {
  id: string;
  isChecked: boolean;
}

const useControlledInput = () => {
  // registeredFilesRef is used only inside this hook. useEffect does not have access to current states, so
  // it makes necessary to use a ref to keep track of latest state updates.
  const registeredFilesRef = useRef<typeof registeredFiles>([]);
  const [isTogglingCheckboxes, setIsTogglingCheckboxes] = useState(false);
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

  console.log("HOOK: ", isTogglingCheckboxes);

  // Handler responsible for toggling state for selection.
  const onToggleFiles = useCallback(() => {
    // In case there is at least one File unchecked, all the files will be checked.
    // Otherwise, all the files will be unchecked.
    const hasUncheckedFile = registeredFilesRef.current.some(
      (file) => !file?.isChecked
    );

    setIsTogglingCheckboxes(hasUncheckedFile ? true : false);
    // setIsTogglingCheckboxes((currentState) => !currentState);

    const updatedRegisteredFiles = [...registeredFilesRef.current];
    updatedRegisteredFiles.forEach(
      (file) => (file!.isChecked = isTogglingCheckboxes)
    );

    registeredFilesRef.current = updatedRegisteredFiles;
    setRegisteredFiles(updatedRegisteredFiles);
  }, [isTogglingCheckboxes]);

  return {
    isTogglingCheckboxes,
    registeredFiles,
    onToggleFiles,
    registerFile,
    unregisterFile,
  };
};

export default useControlledInput;
