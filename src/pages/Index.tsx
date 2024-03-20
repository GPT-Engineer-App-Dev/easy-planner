import {
  Box,
  Button,
  Input,
  VStack,
  HStack,
  Text,
  useToast,
  IconButton,
  useColorMode,
  useColorModeValue,
  Container,
  Heading,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FaPlus, FaTrash, FaSun, FaMoon } from 'react-icons/fa';

interface ITodo {
  id: number;
  text: string;
}

const Index = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [input, setInput] = useState('');
  const toast = useToast();
  const { colorMode, toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue('gray.100', 'gray.700');

  const addTodo = () => {
    if (input.trim() === '') {
      toast({
        title: 'No content',
        description: "Todo can't be empty",
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    const newTodo = {
      id: Date.now(),
      text: input,
    };
    setTodos([...todos, newTodo]);
    setInput(''); // Clear input field after submission
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <Container maxW="container.md" p={4}>
      <VStack spacing={8} py={10}>
        <Heading mb={6}>Todo App</Heading>
        <HStack as="form" onSubmit={e => e.preventDefault()} w="full" bg={formBackground} p={4} borderRadius="md">
          <Input
            placeholder="Add new todo"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            variant="filled"
            bg="whiteAlpha.900"
          />
          <IconButton
            icon={<FaPlus />}
            isRound={true}
            onClick={addTodo}
            aria-label="Add todo"
          />
        </HStack>
        <VStack spacing={4} align="stretch" w="full">
          {todos.map((todo) => (
            <HStack key={todo.id} bg={formBackground} p={4} borderRadius="md" justifyContent="space-between">
              <Text>{todo.text}</Text>
              <IconButton
                icon={<FaTrash />}
                isRound={true}
                onClick={() => deleteTodo(todo.id)}
                aria-label="Delete todo"
              />
            </HStack>
          ))}
        </VStack>
        <Box>
          <Button onClick={toggleColorMode}>
            {colorMode === 'light' ? <FaMoon /> : <FaSun />}
          </Button>
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;