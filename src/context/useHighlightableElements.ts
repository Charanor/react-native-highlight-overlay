import { useContext } from "react";

import HighlightableElementContext from "./context";

const useHighlightableElements = () => useContext(HighlightableElementContext);

export default useHighlightableElements;
