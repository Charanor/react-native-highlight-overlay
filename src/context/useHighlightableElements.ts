import { useContext } from "react";

import HighlightableElementContext from "./context";
import type { HighlightableElementContextType } from "./context";

const useHighlightableElements = (): HighlightableElementContextType =>
	useContext(HighlightableElementContext);

export default useHighlightableElements;
