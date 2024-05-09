'use client'
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Checkbox, Button } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ButtonComponent from "../ButtonComponent/page";

interface Props {
  header: string[];
  data: any[];
  onEdit?: (row: any) => void;
  onDelete?: (row: any) => void;
  onDetails?: (row: any) => void;
  onCheckboxChange?: (checkedItems: any[]) => void;
  onSave?: (checkedItems: any[]) => void;
  className?: string;
  itemsPerPage?: number;
  isOrdered?: boolean;
  isShowImage?: boolean;
  showCheckboxes?: boolean;
  isCheckedAll?: boolean;
}

const TableComponent: React.FC<Props> = ({
  header,
  data,
  onEdit,
  onDelete,
  onDetails,
  onCheckboxChange,
  onSave,
  className,
  itemsPerPage = 10,
  isOrdered = true,
  isShowImage,
  showCheckboxes = false,
  isCheckedAll = false,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [checkedItems, setCheckedItems] = useState<any[]>([]);

  useEffect(() => {
    if (isCheckedAll) {
      setCheckedItems(data);
    } else {
      setCheckedItems([]);
    }
  }, [isCheckedAll, data]);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCheckboxChange = (row: any) => {
    const isChecked = checkedItems.includes(row);
    let newCheckedItems = [...checkedItems];
    if (isChecked) {
      newCheckedItems = newCheckedItems.filter((item) => item !== row);
    } else {
      newCheckedItems.push(row);
    }
    setCheckedItems(newCheckedItems);
    if (onCheckboxChange) {
      onCheckboxChange(newCheckedItems);
    }
  };

  const handleSave = () => {
    if (onSave) {
      onSave(checkedItems);
    }
  };

  return (
    <div className={`max-[1023px]:overflow-scroll lg:overflow-auto ${className}`}>
      <table className="w-full text-center border">
        <thead>
          <tr>
            {isOrdered && <th className="w-8">STT.</th>}
            {header.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
            {showCheckboxes && <th className="w-28">Checked</th>}
            {onEdit && onDelete && onDetails && <th className="w-28">Action</th>}
          </tr>
        </thead>
        <tbody>
          {currentData.length === 0 ? (
            <tr>
              <td
                className="font-medium"
                colSpan={
                  header.length +
                  (isOrdered ? 1 : 0) +
                  (showCheckboxes ? 1 : 0) +
                  (onEdit && onDelete && onDetails ? 1 : 0)
                }
              >
                No data...!
              </td>
            </tr>
          ) : (
            currentData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {isOrdered && <td>{startIndex + rowIndex + 1}</td>}
                {isShowImage && (
                  <td>
                    <div className="text-4xl primary-color">
                      <AccountCircleIcon />
                    </div>
                  </td>
                )}
                {row.map((cell: any, cellIndex: number) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
                {showCheckboxes && (
                  <td className="max-w-28">
                    <Checkbox
                      checked={checkedItems.includes(row)}
                      onChange={() => handleCheckboxChange(row)}
                    />
                  </td>
                )}
                 <td className="max-w-28">
                 {onEdit && (
                 
                 <ButtonComponent
                   onClick={() => onEdit(row)}
                   className="text-xl primary-color"
                   title="Edit button"
                 >
                  
                   <ModeEditIcon />
                 </ButtonComponent>
                
             )} {onDetails && (
                 
              <ButtonComponent
                onClick={() => onDetails(row)}
                className="text-xl primary-color"
                title="Detail button"
              >
               
                <EditCalendarIcon />
              </ButtonComponent>
             
          )} {onDelete && (
                 
            <ButtonComponent
              onClick={() => onDelete(row)}
              className="text-xl primary-color"
              title="Delete button"
            >
             
              <DeleteIcon />
            </ButtonComponent>
           
        )}
                 </td>
                
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="pagination border py-2 flex justify-between items-center px-3 w-full">
        <div>
          <span className="mr-4 text-sm">Tổng: {data.length}</span>
          {showCheckboxes && <ButtonComponent onClick={handleSave} disabled={false}>Save</ButtonComponent>}
        </div>
        <div className="text-sm">
          <span>Pages: {itemsPerPage}</span>
          <span className="ml-4">
            {currentPage} / {totalPages}
          </span>
          <ButtonComponent
            className="text-2xl ml-2 primary-color"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <KeyboardArrowLeftIcon />
          </ButtonComponent>
          <ButtonComponent
            className="text-2xl ml-2 primary-color"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <KeyboardArrowRightIcon />
          </ButtonComponent>
        </div>
      </div>
    </div>
  );
};
export default TableComponent;

// TableComponent.propTypes = {
//   header: PropTypes.arrayOf(PropTypes.string).isRequired,
//   data: PropTypes.array,
//   onDetails: PropTypes.func,
//   onEdit: PropTypes.func,
//   onDelete: PropTypes.func,
//   onCheckboxChange: PropTypes.func,
//   onSave: PropTypes.func,
//   className: PropTypes.string,
//   itemsPerPage: PropTypes.number,
//   isOrdered: PropTypes.bool,
//   isShowImage: PropTypes.bool,
//   showCheckboxes: PropTypes.bool,
// }