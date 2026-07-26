import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

type PaginationRoundedProps = {
  count: number;
  page: number;
  disabled?: boolean;
  onChange: (page: number) => void;
};

export default function PaginationRounded({count,page, onChange}:PaginationRoundedProps) {
    if (count <= 1) {
        return null;
    }
  return (
    <Stack spacing={2} sx={{ direction: "ltr" }}>
      <Pagination 
        count={count} 
        shape="rounded" 
        page={page} 
        sx={{
            "& .MuiPaginationItem-root.Mui-selected": {
                backgroundColor: "#329CCB",
                color: "#fff",
            },
            "& .MuiPaginationItem-root.Mui-selected:hover": {
                backgroundColor: "#2B8AB5",
            },
        }}
        onChange={(_, selectedPage) => {
          onChange(selectedPage);
        }}/>
    </Stack>
  );
}