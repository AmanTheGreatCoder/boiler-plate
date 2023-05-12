import {
  Box,
  IconButton,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@mui/styles";

export const EnhancedTableHead = (props) => {
  const { columns, order, orderBy, onRequestSort } = props;
  const theme = useTheme();
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {columns.map((item) => (
          <TableCell
            key={item.id}
            style={{ ...item.headStyle }}
            align={item.align}
            sx={{ py: 3 }}
            padding={item.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === item.id ? order : false}
          >
            {item.label ? (
              <TableSortLabel
                active={orderBy === item.id}
                direction={orderBy === item.id ? order : "asc"}
                onClick={createSortHandler(item.id)}
              >
                {item.label}
                {orderBy === item.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              item.name
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
