import {
  createContext,
  memo,
  MouseEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Box from "../../box/Box";
import StyledDataGrid from "./styled";
import DataGridColumnHead from "../../data-grid-item/DataGridColumnHead";
import DataGridRow from "../../data-grid-item/DataGridRow";
import ColumnsController from "../../data-grid-item/dropdowns/ColumnsController";
import FilterController from "../../data-grid-item/dropdowns/FilterController";
import sortLists from "./sort";
import DataGridOptions, {
  SortOption,
  DataOptionContext,
  DataGridColoumn,
} from "./type";
import DataGridFooterContainer from "../../data-grid-item/DataGridFooterContainer";
import ScrollContainer from "../../scroll-container/ScrollContainer";
import { Text } from "../../../ui";

export const DataGridOptionContext = createContext<DataOptionContext | null>(
  null
);

type SortableData = { [field: string]: any }[];

const DataGrid = <T extends unknown>({
  columns,
  rows,
  height,
  width,
  pagination,
  rowPerPage,
  rowPerPageOption,
  renderGridData,
}: DataGridOptions<T>) => {
  const [selectedId, setSelectedId] = useState(-1);
  const [sortOption, setSortOption] = useState<SortOption>({
    fieldName: "",
    by: "",
  });
  const [hiddenColumns, setHiddenColumns] = useState(new Set());
  const [columnHiderOpen, setColumnHiderOpen] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [dataList, setDataList] = useState(rows);
  const [footerOption, setFooterOption] = useState({
    next: rowPerPage!,
    passedRows: 1,
  });

  const sortedList = useMemo(() => {
    if (rows.length <= 0 || !sortOption.by) {
      return rows;
    }
    const sorted = sortLists(dataList as SortableData);
    return sorted(sortOption.fieldName, sortOption.by);
  }, [sortOption, rows]);

  useEffect(() => {
    if (sortedList.length > 0) {
      setDataList(sortedList);
    }
  }, [sortedList]);

  const handleSelectRow = (eve: MouseEvent<HTMLDivElement>) => {
    const id = eve.currentTarget.dataset.id;
    setSelectedId(Number(id));
  };

  const handleSortBy = (
    sortOption: (state: SortOption) => void,
    dir: "asc" | "desc"
  ) => {
    return (option: SortOption) => {
      sortOption({ fieldName: option.fieldName, by: dir ? dir : option.by });
    };
  };

  // column hide handler
  const handleHideColumn = (fieldId: string) => {
    const updatedSet = new Set(hiddenColumns.values());
    updatedSet.add(fieldId);
    setHiddenColumns(updatedSet);
  };

  // Show column customizer box
  const handleShowColumnCustomizer = () => {
    setColumnHiderOpen((prevState) => {
      document.addEventListener("click", closeActions);
      return !prevState;
    });

    // hide if filter box is open
    if (showFilter) {
      setShowFilter(false);
    }
  };

  // Show filter box
  const handleShowFilter = () => {
    setShowFilter((prevState) => {
      document.addEventListener("click", closeActions);
      return !prevState;
    });
    // hide if column customizer is open/show
    if (columnHiderOpen) {
      setColumnHiderOpen(false);
    }
  };

  // Create DOM reference
  const listActionRef = useRef<HTMLDivElement | null>(null);

  const closeActions = (event: any) => {
    if (listActionRef.current) {
      // If current click don't matched with the listActionRef,
      // hide the opened action list (filter and ColumnCustomizer)
      if (!listActionRef.current.contains(event.target)) {
        setColumnHiderOpen(() => {
          document.removeEventListener("click", closeActions);
          return false;
        });
        setShowFilter(() => {
          document.removeEventListener("click", closeActions);
          return false;
        });
      }
    }
  };

  return (
    <StyledDataGrid className="data-grid" width={width}>
      <DataGridOptionContext.Provider
        value={{
          sortByAsc: handleSortBy(setSortOption, "asc"),
          sortByDesc: handleSortBy(setSortOption, "desc"),
          hideColumn: handleHideColumn,
          handleOpenColumnsCustomizer: handleShowColumnCustomizer,
          handleShowFilter: handleShowFilter,
        }}
      >
        {/* Render Data Grid Heading */}
        <DataGridRow dataId={1} rowId={0} selected={false}>
          {columns.map((item) => (
            <DataGridColumnHead
              key={item.fieldId}
              fieldId={item.fieldId}
              label={item.label}
              width={item.width}
              sorted={item.fieldId === sortOption.fieldName}
              onSortField={(field, dir) =>
                setSortOption({ fieldName: field, by: dir! })
              }
              sortDir={
                item.fieldId === sortOption.fieldName
                  ? (sortOption.by as any)
                  : ""
              }
              hidden={hiddenColumns.has(item.fieldId)}
            />
          ))}
          {/* Show/Hide filter and Hide column dropdown */}
          <div ref={listActionRef} className="list-action-wrapper zIndex-1">
            {columnHiderOpen && (
              <ColumnsController
                stateSetter={setHiddenColumns}
                hiddenColumns={hiddenColumns as typeof hiddenColumns}
                columnList={columns.map((column) => ({
                  fieldId: column.fieldId,
                  hidden: hiddenColumns.has(column.fieldId),
                  label: column.label,
                }))}
              />
            )}

            {showFilter && (
              <FilterController
                fields={columns}
                lists={rows}
                onFilterLists={(filteredData) => setDataList(filteredData)}
              />
            )}
          </div>
        </DataGridRow>
      </DataGridOptionContext.Provider>

      {/*  Render data list */}
      <Box className="data_grid_body">
        {/* Loop through data list */}
        {dataList.length > 0 ? (
          dataList
            .slice(footerOption.passedRows - 1, footerOption.next)
            .map((item, index) => (
              <DataGridRow
                dataId={item[columns[0].fieldId] as string}
                rowId={index}
                selected={selectedId === item[columns[0].fieldId]}
                key={index}
                onClick={handleSelectRow}
              >
                {renderGridData(
                  item,
                  columns.reduce<Record<string, DataGridColoumn>>(
                    (acc, cur) => {
                      acc[cur.fieldId] = cur;
                      return acc;
                    },
                    {}
                  )
                )}
              </DataGridRow>
            ))
        ) : (
          <Box padding={56}>
            <Text align="center" paragraph>
              No rows :(
            </Text>
          </Box>
        )}
      </Box>
      {pagination && (
        <DataGridFooterContainer
          total={rows.length}
          rowPerPage={rowPerPage!}
          rowPerPageOptions={rowPerPageOption!}
          setPaginationOption={setFooterOption}
        />
      )}
    </StyledDataGrid>
  );
};
export default memo(DataGrid);
