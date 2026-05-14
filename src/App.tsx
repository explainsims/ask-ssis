/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChatInterface } from "./ChatInterface";

export default function App() {
  return (
    <div className="min-h-screen bg-[#faf9f6] text-gray-900 dark:bg-[#0e1419] dark:text-[#f8f5e6] font-sans selection:bg-[#0f7a82]/20 selection:text-[#0f7a82] dark:selection:bg-[#b08434]/30 dark:selection:text-[#b08434]">
      <ChatInterface />
    </div>
  );
}
