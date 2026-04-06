# Flow Specification

## Entry Points
- Direct home page visit
- QR code in the restaurant
- Search or social link for remote orders

## Main Flow
1. User lands on hero.
2. User selects a mode:
   - `Estoy en el local`
   - `Quiero pedir por teléfono`
3. Hero copy and menu framing adapt to the chosen mode.
4. User continues to:
   - Menu categories and search
   - Promotions section
   - Phone order panel and contact details
5. User exits by:
   - Showing selected item to the waiter
   - Calling the restaurant

## Design Principles Applied
- Task before story: menu and ordering appear before brand narrative.
- Mode clarity: in-store and remote intents are explicitly separated.
- Repeated key action: phone ordering is available in multiple locations.
- Scanability first: category tabs, summary text, and search feedback reduce cognitive load.
- Mobile resilience: persistent bottom actions support small-screen use.

## Accessibility Notes
- Category controls now expose `role=tab` and `aria-selected`.
- Search feedback is announced through a live region container.
- Action buttons meet touch-friendly sizing.
- Critical actions remain text-labeled, not icon-only.

## Remaining Opportunities
- Add explicit dietary filters beyond free-text search.
- Add a compact sticky category scroller on mobile once real-device testing confirms need.
- Validate wording and ordering behavior with real customers in the restaurant.
