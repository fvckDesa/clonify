import { PropsWithChildren, createContext, useContext } from "react";
import { PartialAlbum, Artist, PartialPlaylist } from "@/types/spotify";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export type HistoryItem = PartialAlbum | Artist | PartialPlaylist;

interface SearchHistoryProps {
  history: HistoryItem[];
  setItem: (item: HistoryItem) => void;
  removeItem: (id: HistoryItem["id"]) => void;
}

const SearchHistoryContext = createContext<SearchHistoryProps | null>(null);

const HISTORY_KEY = "history";

function SearchHistoryProvider({ children }: PropsWithChildren) {
  const [history, setHistory] = useLocalStorage<HistoryItem[]>(
    HISTORY_KEY,
    [],
    convertJson
  );

  function setItem(item: HistoryItem): void {
    setHistory((items) => items.concat(item));
  }

  function removeItem(id: HistoryItem["id"]): void {
    setHistory((items) => items.filter((item) => item.id !== id));
  }

  return (
    <SearchHistoryContext.Provider value={{ history, setItem, removeItem }}>
      {children}
    </SearchHistoryContext.Provider>
  );
}

export default SearchHistoryProvider;

export function useSearchHistory() {
  const ctx = useContext(SearchHistoryContext);
  if (!ctx) {
    throw new Error(
      '"useSearchHistory" hook need be wrap with "SearchHistoryProvider" to work'
    );
  }

  return ctx;
}

function convertJson(_: string, value: unknown): unknown {
  if (typeof value === "string" && !isNaN(Date.parse(value))) {
    return new Date(value);
  }

  return value;
}
