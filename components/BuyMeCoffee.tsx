import Script from "next/script";

export const BuyMeCoffeeButton = () => {
  return (
    <div>
      <Script
        src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
        data-name="BMC-Widget"
        data-cfasync="false"
        data-id="aryasingh"
        data-description="Support me building CodeX"
        data-message="Help Me Build More Open Source Projects"
        data-color="#40DCA5"
        data-position="Right"
        data-x_margin="18"
        data-y_margin="18"
        strategy="lazyOnload" // Ensures the script loads without blocking
      />
    </div>
  );
};
