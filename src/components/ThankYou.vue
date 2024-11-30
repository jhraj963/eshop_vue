<template>
  <div class="thank-you-page">
    <h2>Thank You for Your Order!</h2>
    <p>Your order has been successfully placed.</p>

    <!-- Display order details -->
    <div v-if="orderDetails">
      <h3>Order Summary</h3>
      <p><strong>Order Number:</strong> {{ orderDetails.order_number }}</p>
      <p><strong>Order Date:</strong> {{ orderDetails.order_date }}</p>
      <p><strong>Total Amount:</strong> ৳{{ orderDetails.total_amount }}</p>

      <!-- Download Invoice Button -->
      <button @click="downloadInvoice">Download Invoice</button>
    </div>
  </div>
</template>

<script>
import { jsPDF } from "jspdf"; // Import jsPDF library

export default {
  name: "ThankYou",
  data() {
    return {
      // Retrieve order details passed through route params (from Checkout)
      orderDetails: this.$route.params.orderDetails || {},
    };
  },
  methods: {
    // Method to generate and download the invoice as a PDF
    downloadInvoice() {
      // Create a new jsPDF instance for PDF generation
      const doc = new jsPDF();

      // Add Invoice Title
      doc.setFontSize(18);
      doc.text("Invoice", 20, 20);

      // Add Order Details to the PDF
      doc.setFontSize(12);
      doc.text(`Order Number: ${this.orderDetails.order_number}`, 20, 30);
      doc.text(`Order Date: ${this.orderDetails.order_date}`, 20, 40);
      doc.text(`Total Amount: ৳${this.orderDetails.total_amount}`, 20, 50);

      // Add Product Details (Loop through cart items if available)
      let yPosition = 60; // Start from Y position 60
      this.orderDetails.items.forEach((item) => {
        const itemLine = `${item.productname} x ${item.quantity}: ৳${item.price * item.quantity}`;
        doc.text(itemLine, 20, yPosition);
        yPosition += 10; // Increment Y position for next line
      });

      // Finalize the PDF download
      doc.save(`Invoice-${this.orderDetails.order_number}.pdf`);
    },
  },
};
</script>

<style scoped>
.thank-you-page {
  padding: 50px;
  text-align: center;
}

.thank-you-page h2 {
  margin-bottom: 20px;
}

.thank-you-page p {
  margin-bottom: 10px;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #218838;
}
</style>
