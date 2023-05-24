import {
  Box,
  Button,
  Grid,
  chakra,
  Heading,
  Spinner,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Table } from "../../@types";
import { setIsAuthenticated, setTableDetails } from "../../app/authSlice";
import { useAppDispatch } from "../../app/store";
import {
  useBookTableMutation,
  useGetAllTableQuery,
  useShareTableMutation,
} from "../../app/tableApiSlice";

const TableList = () => {
  const { data, isLoading: isTableLoading } = useGetAllTableQuery(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const handleClose = () => {
    onClose();
    setSelectedTable(null);
  };
  return (
    <Box p={"1rem"}>
      <Heading size={"xl"}>Welcome to SKS</Heading>
      <Heading size={"lg"} fontWeight={"semibold"}>
        Table List
      </Heading>
      {isTableLoading && <Spinner />}
      <Grid templateColumns="repeat(2, 1fr)" gap={6} mt={"1rem"}>
        {data?.map((table) => (
          <Button
            fontSize={"xl"}
            width={"100%"}
            height={"100px"}
            onClick={() => {
              setSelectedTable(table);
              onOpen();
            }}
            key={table.tableNumber}
          >
            {table.tableNumber}
          </Button>
        ))}
      </Grid>
      {isOpen && selectedTable && (
        <AuthModalBox
          table={selectedTable}
          isOpen={isOpen}
          onClose={handleClose}
        />
      )}
    </Box>
  );
};

type formType = {
  sharePassword: string;
  createPassword: string;
  confirmPassword: string;
};

const AuthModalBox = ({
  table,
  isOpen,
  onClose,
}: {
  table: Table;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<formType>();
  const dispatch = useAppDispatch();
  const toast = useToast();
  const [bookTable, { isLoading: isTableBooking }] = useBookTableMutation();
  const [shareTable, { isLoading: isTableSharing }] = useShareTableMutation();
  const handleTableBook = (data: formType) => {
    const { createPassword } = data;
    bookTable({
      tableNumber: table.tableNumber,
      password: createPassword,
    })
      .unwrap()
      .then(() => {
        dispatch(setIsAuthenticated(true));
        dispatch(setTableDetails(table));
        toast({
          title: "Success",
          description: "Table Booking Success",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Error",
          description: "Table Booking Failed",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      });
  };

  const handleTableShare = (data: formType) => {
    const { sharePassword } = data;
    shareTable({
      tableNumber: table.tableNumber,
      password: sharePassword,
    })
      .unwrap()
      .then((res) => {
        console.log(res);
        dispatch(setIsAuthenticated(true));
        dispatch(setTableDetails(table));
        toast({
          title: "Success",
          description: "Table Sharing Success",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Error",
          description: "Table Sharing Failed",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      });
  };
  return (
    <Modal isOpen={isOpen} isCentered onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {table.status ? "Enter Password" : "Create password"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <chakra.form
            noValidate
            onSubmit={handleSubmit(
              table.status ? handleTableShare : handleTableBook
            )}
          >
            {table.status ? (
              <FormControl isRequired isInvalid={Boolean(errors.sharePassword)}>
                <FormLabel>Enter Password</FormLabel>
                <Input
                  placeholder="Password"
                  {...register("sharePassword", {
                    required: "Password is required",
                  })}
                />
                <FormErrorMessage>
                  {errors.sharePassword?.message}
                </FormErrorMessage>
              </FormControl>
            ) : (
              <>
                <FormControl
                  isRequired
                  isInvalid={Boolean(errors.createPassword)}
                >
                  <FormLabel>Enter New Password</FormLabel>
                  <Input
                    placeholder="Password"
                    {...register("createPassword", {
                      required: "Password is required",
                    })}
                  />
                  <FormErrorMessage>
                    {errors.createPassword?.message}
                  </FormErrorMessage>
                </FormControl>
                <br />
                <FormControl
                  isRequired
                  isInvalid={Boolean(errors.confirmPassword)}
                >
                  <FormLabel>Confirm New Password</FormLabel>
                  <Input
                    placeholder="Password"
                    {...register("confirmPassword", {
                      required: "Confirm Password is required",
                      validate: () => {
                        return watch("createPassword") !==
                          watch("confirmPassword")
                          ? "Password does not match"
                          : true;
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.confirmPassword?.message}
                  </FormErrorMessage>
                </FormControl>
              </>
            )}
            <Button
              my={"1rem"}
              type={"submit"}
              colorScheme={"green"}
              width={"full"}
              isLoading={table.status ? isTableSharing : isTableBooking}
            >
              Confirm
            </Button>
          </chakra.form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default TableList;
