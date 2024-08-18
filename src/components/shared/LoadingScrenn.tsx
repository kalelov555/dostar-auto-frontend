const LoadingScreen = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <i
        className="pi pi-spin pi-spinner text-primary"
        style={{ fontSize: "4rem" }}
      ></i>
    </div>
  );
};

export default LoadingScreen;
