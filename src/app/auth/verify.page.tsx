import {
  FC,
  useEffect,
  useRef,
  KeyboardEvent,
  useState,
  FormEvent,
  FocusEvent,
  useCallback,
} from "react";
import {
  Box,
  Container,
  Input,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import * as yup from "yup";
import { LoadingButton } from "@mui/lab";
import { verifyCode } from "app/auth/store/auth.actions";
import { useAppDispatch } from "hooks/redux.hooks";
import { useNavigate } from "react-router-dom";
import { VerifyCodeForm } from "./types/forms/verify-code.form";

const VerificationInput = styled(Input)(({ theme }) => ({
  width: "2rem",
  fontSize: "1.4rem",
  fontWeight: "600",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: theme.palette.secondary.main,
  input: { textAlign: "center " },
  appearance: "textfield",
  "input::-webkit-outer-spin-button, input::-webkit-inner-spin-button": {
    appearance: "none",
    margin: 0,
  },
}));

type InputOrNull = HTMLInputElement | null;

interface Props {
  title: string;
  email: string;
  length?: number;
}

const schema = yup.array().required().of(yup.number().required());

const VerificationPage: FC<Props> = ({ title, email, length = 6 }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [code, setCode] = useState<string[]>(Array(length).fill(""));
  const update = useCallback((index: number, val: string) => {
    return setCode((prevState) => {
      const slice = prevState.slice();
      slice[index] = val;
      return slice;
    });
  }, []);

  const formRef = useRef<HTMLFormElement>(null);

  function handleKeyDown(evt: KeyboardEvent<HTMLInputElement>) {
    const index = parseInt(evt.currentTarget.dataset.index as string);
    const form = formRef.current;
    if (isNaN(index) || form === null) return;

    const prevIndex = index - 1;
    const nextIndex = index + 1;
    const prevInput: InputOrNull = form.querySelector(`.input-${prevIndex}`);
    const nextInput: InputOrNull = form.querySelector(`.input-${nextIndex}`);
    switch (evt.key) {
      case "Backspace":
        if (code[index]) update(index, "");
        else if (prevInput) prevInput.select();
        break;
      case "ArrowRight":
        evt.preventDefault();
        if (nextInput) nextInput.focus();
        break;
      case "ArrowLeft":
        evt.preventDefault();
        if (prevInput) prevInput.focus();
    }
  }

  function handleChange(evt: FormEvent<HTMLInputElement>) {
    const value = evt.currentTarget.value;
    const index = parseInt(evt.currentTarget.dataset.index as string);
    const form = formRef.current;
    if (isNaN(index) || form === null) return;

    let nextIndex = index + 1;
    let nextInput: InputOrNull = form.querySelector(`.input-${nextIndex}`);

    update(index, value[0] || "");
    if (value.length === 1) nextInput?.focus();
    else if (index < length - 1) {
      const split = value.slice(index + 1, length).split("");
      split.forEach((val) => {
        update(nextIndex, val);
        nextInput?.focus();
        nextIndex++;
        nextInput = form.querySelector(`.input-${nextIndex}`);
      });
    }
  }

  function handleFocus(evt: FocusEvent<HTMLInputElement>) {
    evt.currentTarget.select();
  }

  useEffect(() => {
    if (isSubmitted) {
      try {
        setIsValid(true);
        setIsValid(schema.isValidSync(code, { context: { length } }));
      } catch (e) {}
    }
  }, [code]);

  async function handleSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    setIsSubmitted(true);
    try {
      const data = await schema.validate(code, { context: { length } });
      const combinedNumber = parseInt(data.join(""));
      const dataObject: VerifyCodeForm = {
        code: combinedNumber,
      };

      const response = await dispatch(verifyCode(dataObject));

      if (response.meta.requestStatus == "fulfilled" && response.payload) {
        navigate("/auth/reset");
      }
    } catch (e) {
      setIsValid(false);
    }
  }

  return (
    <Container component="main" maxWidth="xs" sx={{ paddingTop: "20vh" }}>
      <Box
        component="form"
        ref={formRef}
        onSubmit={handleSubmit}
        noValidate
        bgcolor="white"
        py={5}
        px={{ xs: 2.5, md: 5.5 }}
        borderRadius="16px"
        boxShadow={3}
      >
        <Typography variant="h4" mb={1.2}>
          Verification
        </Typography>
        <Typography mb={2.5}>
          Activation code was sent to your email
          <br />
          <Box component={"strong"} color={"primary.main"}>
            {email}
          </Box>
        </Typography>
        <Stack
          component={"fieldset"}
          border={"none"}
          direction={"row"}
          spacing={1.2}
          justifyContent={"center"}
        >
          {code.map((value, i) => (
            <VerificationInput
              key={i}
              value={value}
              error={isSubmitted && !isValid}
              inputProps={{
                type: "number",
                className: `input-${i}`,
                "aria-label": `Number ${i + 1}`,
                "data-index": i,
                pattern: "[0-9]*",
                inputtype: "numeric",
                onChange: handleChange,
                onKeyDown: handleKeyDown,
                onFocus: handleFocus,
              }}
            />
          ))}
        </Stack>
        <Box textAlign="center" mt={2.5}>
          <LoadingButton
            type="submit"
            size="large"
            variant="contained"
            sx={{ paddingX: (theme) => theme.spacing(8) }}
          >
            {"confirm"}
          </LoadingButton>
        </Box>
        <Box mt={2.5} textAlign="right" sx={{ a: { color: "secondary.main" } }}>
          <Typography>
            <Box component="span" color="primary.main">
              Didn't receive the code?
            </Box>
            &nbsp;
            {/* <Link>Resend</Link> */}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default VerificationPage;
