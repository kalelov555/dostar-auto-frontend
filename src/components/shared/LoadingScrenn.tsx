const LoadingScreen = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <i
        className="pi pi-spin pi-spinner text-primary"
        style={{ fontSize: "4rem" }}
      ></i>
    </div>
  );
};

export default LoadingScreen;
