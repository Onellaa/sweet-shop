import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/PaymentPage.css"; // ← new stylesheet
import pay from "../assets/hq.png";
import Swal from 'sweetalert2';
export default function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [card, setCard] = useState({
    name: "",
    number: "",
    month: "",
    year: "",
    cvv: "",
  });

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  /* ── keeps your original API / logic ───────────────────── */
  const handleConfirm = async () => {
    if (!paymentMethod) {
      return Swal.fire({
        icon: "warning",
        title: "Select a payment method",
        text: "Please choose either Card or Cash on Delivery.",
        background: "#f9fbe7", // soft yellow-green
        color: "#33691e", // dark green text
        confirmButtonColor: "#aed581", // lime green button
      });
    }
    if (
      paymentMethod === "Card Payment" &&
      Object.values(card).some((v) => v.trim() === "")
    ) {
      return Swal.fire({
        icon: "info",
        title: "Incomplete details",
        text: "Please fill in all card fields before paying.",
        background: "#f9fbe7",
        color: "#33691e",
        confirmButtonColor: "#aed581",
      });
    }

    try {
      await axios.post(
        "http://localhost:3000/api/payment/checkout",
        { paymentMethod },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      Swal.fire({
        icon: "success",
        title: "Order placed! 🎉",
        text: "Thanks for your order. Redirecting...",
        background: "#f9fbe7",
        color: "#33691e",
        timer: 2000,
        showConfirmButton: false,
      }).then(() => navigate("/orders"));
      
    } catch (err) {
      console.error("Payment error:", err);
      Swal.fire({
        icon: "error",
        title: "Oops! Payment failed",
        text: "Something went wrong. Try again later.",
        background: "#f9fbe7",
        color: "#33691e",
        confirmButtonColor: "#aed581",
      });
    }
  };

  /* ──────────────────────────────────────────────────────── */

  return (
    <div className="bdy">
      <div className="checkout-wrapper">
        {/* ───── radio buttons ───── */}
        <h2 className="pay-heading">Choose Your Payment Method</h2>
        <div className="pay-radio-row">
          <label>
            <input
              type="radio"
              name="payment"
              value="Cash on Delivery"
              onChange={(e) => {
                setPaymentMethod(e.target.value);
                setCard({ name: "", number: "", month: "", year: "", cvv: "" });
              }}
            />
            Cash on Delivery 💵
          </label>

          <label>
            <input
              type="radio"
              name="payment"
              value="Card Payment"
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Card Payment 💳
          </label>
        </div>
        {/* ───── nice filler when no card form ───── */}
        {(!paymentMethod || paymentMethod === "Cash on Delivery") && (
          <div className="cod-showcase">
            <img
              src={pay} /* ← any fun PNG/SVG you have */
              alt="Cash on delivery"
              className="cod-image2"
            />
            <div className="cod-text">
              <h3>Pay with Cash on Delivery</h3>
              <p>
                Hand your payment to our courier upon arrival. No extra fees –
                just delicious treats at your doorstep!
              </p>
            </div>
          </div>
        )}

        {/* ───── card UI + form (only when Card Payment) ───── */}
        {paymentMethod === "Card Payment" && (
          <div className="card-grid">
            {/* 3-D preview */}
            <div className="card-preview">
              <div className="credit-card">
                <div className="card-chip" />
                <div class="card-icon3">
                  <img
                    src="http://www.freeiconspng.com/uploads/visa-icon-0.png"
                    alt="Visa"
                  />
                </div>
                <p className="card-num">
                  {card.number.padEnd(16, "•").replace(/(.{4})/g, "$1 ")}
                </p>
                <div className="card-info-row">
                  <span className="card-name">
                    {card.name || "CARDHOLDER NAME"}
                  </span>
                  <span className="card-exp">
                    {card.month || "MM"}/{card.year || "YY"}
                  </span>
                </div>
              </div>
              <div className="card-shadow" />
            </div>

            {/* form */}
            <div className="card-form">
              <label>CARDHOLDER NAME</label>
              <input
                type="text"
                placeholder="e.g. Jane Doe"
                value={card.name}
                onChange={(e) => setCard({ ...card, name: e.target.value })}
              />

              <label>CARD NUMBER</label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                maxLength={16}
                value={card.number}
                onChange={(e) =>
                  setCard({
                    ...card,
                    number: e.target.value.replace(/\D/g, ""),
                  })
                }
              />

              <div className="small-grid">
                <div>
                  <label>EXPIRY MONTH</label>
                  <input
                    type="text"
                    placeholder="MM"
                    maxLength={2}
                    value={card.month}
                    onChange={(e) =>
                      setCard({
                        ...card,
                        month: e.target.value.replace(/\D/g, ""),
                      })
                    }
                  />
                </div>
                <div>
                  <label>EXPIRY YEAR</label>
                  <input
                    type="text"
                    placeholder="YY"
                    maxLength={2}
                    value={card.year}
                    onChange={(e) =>
                      setCard({
                        ...card,
                        year: e.target.value.replace(/\D/g, ""),
                      })
                    }
                  />
                </div>
                <div>
                  <label>CVV</label>
                  <input
                    type="text"
                    placeholder="123"
                    maxLength={3}
                    value={card.cvv}
                    onChange={(e) =>
                      setCard({
                        ...card,
                        cvv: e.target.value.replace(/\D/g, ""),
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <button className="pay-btn" onClick={handleConfirm}>
          PAY NOW
        </button>
      </div>
    </div>
  );
}
